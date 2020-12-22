import { sleepTime } from './Clock'
import { Sequence, makeSequence, makeSequences } from './Sequence'
import { soundNames, defaultSound, defaultNoteLength, playSound, playDefaultSound } from './Sound'
import { sleep } from './Event'
import * as Tone from 'tone'

interface CurrentState {
    step: number
    sleepTime: number
    isPlaying: boolean
}

interface UIHandlers {
    onAddSequence: () => Sequence[]
    onRemoveSequence: (sequenceIndex: number) => Sequence[]
    onCellClick: (seqIndex: number, cellIndex: number) => Sequence[]
    onAddStep: () => Sequence[]
    onRemoveStep: () => Sequence[]
    onPlay: () => void
    onStop: () => void
    onSoundSelectChange: (soundName: string, pitch: number, sequenceIndex: number) => Sequence[]
    onBPMchange: (bpm: number) => void
    getCurrentState: () => CurrentState
}
  
export interface UIProps {
    handlers: UIHandlers
    sequences: Sequence[]
    soundNames: string[]
    defaultSound: {name: string, pitch: number}
    defaultBPM: number
}

interface ActionPayload {
    sequenceIndex?: number
    cellIndex?: number
    event?: any
    soundName?: string
    pitch?: number
}

interface Action {
    type: string
    payload?: ActionPayload
}

const App = () => {

    let bpm = 140
    let steps = 32
    let isPlaying: boolean = false
    let isLooping: boolean = false
    let currentStep: number = 0
    let currentSleepTime: number = sleepTime(bpm)
    let defaultSequences = 4
    let sequences: Sequence[] = makeSequences(defaultSequences, steps)
    const defaultMelody = [0, 4, 8, 10, 12, 16, 18, 20, 22, 26, 28]
    defaultMelody.forEach(cellIndex => sequences[0][cellIndex] = playDefaultSound)

    //Tone.Transport.bpm.value = bpm;
    Tone.start()

    // keeps track of sounds mapped to sequences. Updated on UI sound select change
    const soundMap: {[key: number]: string} = {} 

    const playOnce = async(): Promise<any> => {
        isPlaying = true
        for (let step=0;step<steps; step++) {
            currentStep = step
            const stepEvents = []
            for (let sequence of sequences) {
                const stepEvent = sequence[step]
                if (stepEvent) {
                    stepEvents.push(stepEvent)
                }
            }
            for (const stepEvent of stepEvents) {
                stepEvent()
            }
            currentSleepTime = sleepTime(bpm)
            await sleep(currentSleepTime)
        }
        isPlaying = false
    }

    const loop = async() => {
        if (isLooping) {
            await playOnce()
            loop()
        }
    }

    const play = () =>  {
        if (!isPlaying) {
            isLooping = !isLooping
            loop()
        }   
    }

    const stop = () => isLooping = false

    const sequencesReducer = (sequences: Sequence[], action: Action) => {
        let sequenceIndex: number
        let event: any
        let soundName: string
        switch (action.type) {
            case 'ADD SEQUENCE':
                const newSequence = makeSequence(steps)
                return sequences.concat([newSequence])

            case 'REMOVE SEQUENCE':
                sequenceIndex = action.payload?.sequenceIndex as number
                return sequences.filter((seq, index) => index !== sequenceIndex)

            case 'TOGGLE CELL':
                sequenceIndex = action.payload?.sequenceIndex as number
                const cellIndex = action.payload?.cellIndex as number
                const cell = sequences[sequenceIndex][cellIndex]
                soundName = soundMap[sequenceIndex]
                event = () => soundName ? playSound([soundName, defaultNoteLength]) : playDefaultSound()

                // do not allow more than 1 sound per step
                sequences = sequences.map(seq => seq.map((cell, idx) => idx === cellIndex ? null : cell))

                sequences[sequenceIndex][cellIndex] = cell ? null : event
                return sequences

            case 'ADD STEP':
                steps += 1
                return sequences.map(seq => seq.concat(null))

            case 'REMOVE STEP':
                steps -= 1
                return sequences.map(seq => seq.slice(0, -1))

            case 'CHANGE SOUND':
                soundName = action.payload?.soundName as string
                const pitch = action.payload?.pitch
                sequenceIndex = action.payload?.sequenceIndex as number
                soundMap[sequenceIndex] = soundName + pitch
                const sequence = sequences[sequenceIndex]
                event = () => playSound([soundName + pitch, defaultNoteLength])
                sequences[sequenceIndex] = sequence.map(cell => cell ? event : cell)
                return sequences
        }
        return sequences
    }

    // reducers
    const addSequenceReducer = () => {
        return sequencesReducer(sequences, {type: 'ADD SEQUENCE'})
    }
    const remvoveSequenceReducer = (sequenceIndex: number) => {
        return sequencesReducer(sequences, {type: 'REMOVE SEQUENCE', payload: {sequenceIndex: sequenceIndex}})
    }

    const toggleCellReducer = (sequenceIndex: number, cellIndex: number) => {
        const payload = {sequenceIndex: sequenceIndex, cellIndex: cellIndex}
        return sequencesReducer(sequences, {type: 'TOGGLE CELL', payload: payload})
    }

    const addStepReducer = () => {
        return sequencesReducer(sequences, {type: 'ADD STEP'})
    }

    const removeStepReducer = () => {
        return sequencesReducer(sequences, {type: 'REMOVE STEP'})
    }

    const changeSoundReducer = (soundName: string, pitch: number, sequenceIndex: number) => {
        const payload = {soundName: soundName, pitch: pitch, sequenceIndex: sequenceIndex}
        return sequencesReducer(sequences, {type: 'CHANGE SOUND', payload: payload})
    }

    // handlers
    const addSequence = (): Sequence[] => {
        return sequences = addSequenceReducer()
    }

    const removeSequence = (sequenceIndex: number): Sequence[] => {
        return sequences = remvoveSequenceReducer(sequenceIndex)
    }

    const toggleCell = (sequenceIndex: number, cellIndex: number): Sequence[] => {
        return sequences = toggleCellReducer(sequenceIndex, cellIndex)
    }

    const addStep = () => {
        return sequences = addStepReducer()
    }

    const removeStep = () => {
        return sequences = removeStepReducer()
    }

    const changeSound = (soundName: string, pitch: number, sequenceIndex: number) => {
        return sequences = changeSoundReducer(soundName, pitch, sequenceIndex)
    }

    const changeBPM = (newBpm: number) => {
        bpm = newBpm
        //Tone.Transport.bpm.value = bpm
    }

    const UIHandlers: UIHandlers = {
        onAddSequence: addSequence,
        onRemoveSequence: removeSequence,
        onCellClick: toggleCell,
        onAddStep: addStep,
        onRemoveStep: removeStep,
        onPlay: play,
        onStop: stop,
        onSoundSelectChange: changeSound,
        onBPMchange: changeBPM,
        getCurrentState: (): CurrentState => {
            return {step: currentStep, sleepTime: currentSleepTime, isPlaying: isPlaying}
        }
    }

    const UIProps: UIProps = {
        handlers: UIHandlers,
        sequences: sequences,
        soundNames: soundNames,
        defaultSound: defaultSound,
        defaultBPM: bpm,
    }

    return {
        UIProps: UIProps,
    }

}

const app = App()

export default app

