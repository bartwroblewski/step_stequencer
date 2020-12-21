import { bpm, sleepTime } from './Clock'
import { Sequence, makeSequence, makeSequences } from './Sequence'
import { soundNames, defaultSound, playSound, playDefaultSound } from './Sound'
import { sleep } from './Event'
import * as Tone from 'tone'

interface UIHandlers {
    onAddSequence: () => Sequence[]
    onRemoveSequence: (sequenceIndex: number) => Sequence[]
    onCellClick: (seqIndex: number, cellIndex: number) => Sequence[]
    onAddStep: () => Sequence[]
    onRemoveStep: () => Sequence[]
    onPlay: () => void
    onSoundSelectChange: (soundName: string, pitch: number, sequenceIndex: number) => Sequence[]
}
  
export interface UIProps {
    handlers: UIHandlers
    sequences: Sequence[]
    soundNames: string[]
    defaultSound: {name: string, pitch: number}
}

interface ActionPayload {
    sequenceIndex?: number
    cellIndex?: number
    event?: any
}

interface Action {
    type: string
    payload?: ActionPayload
}

const App = () => {

    let steps = 32
    let sequences: Sequence[] = makeSequences(4, steps, 100)
    const defaultMelody = [0, 4, 8, 10, 12, 16, 18, 20, 22, 26, 28]
    defaultMelody.forEach(cellIndex => sequences[0][cellIndex] = playDefaultSound)

    Tone.Transport.bpm.value = bpm;
    Tone.start()

    // keeps track of sounds mapped to sequences. Updated on UI sound select change
    const soundMap: {[key: number]: string} = {} 

    const playOnce = async(): Promise<any> => {
        for (let step=0;step<steps; step++) {
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
            await sleep(sleepTime)
        }
    }

    const sequencesReducer = (sequences: Sequence[], action: Action) => {
        switch (action.type) {
            case 'ADD SEQUENCE':
                const newSequence = makeSequence(steps, 100)
                return sequences.concat([newSequence])

            case 'REMOVE SEQUENCE':
                const seqIndex = action.payload?.sequenceIndex
                return sequences.filter((seq, index) => index !== seqIndex)

            case 'TOGGLE CELL':
                const sequenceIndex = action.payload?.sequenceIndex as number
                const cellIndex = action.payload?.cellIndex as number
                const cell = sequences[sequenceIndex][cellIndex]
                const sound = soundMap[sequenceIndex]
                const event = () => sound ? playSound([sound, '16N']) : playDefaultSound()

                // do not allow more than 1 sound per step
                sequences = sequences.map(seq => seq.map((cell, idx) => idx === cellIndex ? null : cell))

                sequences[sequenceIndex][cellIndex] = cell ? null : event
                return sequences
        }
        return sequences
    }

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

    const addSequence = (): Sequence[] => {
        return sequences = addSequenceReducer()
    }

    const removeSequence = (sequenceIndex: number): Sequence[] => {
        return sequences = remvoveSequenceReducer(sequenceIndex)
    }

    const toggleCell = (sequenceIndex: number, cellIndex: number): Sequence[] => {
        return sequences = toggleCellReducer(sequenceIndex, cellIndex)
    }

    const UIHandlers: UIHandlers = {
        onAddSequence: addSequence,
        onRemoveSequence: removeSequence,
        onCellClick: toggleCell,
        onAddStep: () => {
            steps += 1
            return sequences = sequences.map(seq => seq.concat(null))
        },
        onRemoveStep: () => {
            steps -= 1
            return sequences = sequences.map(seq => seq.slice(0, -1))
        },
        onPlay: () => playOnce(),
        onSoundSelectChange: (soundName: string, pitch: number, sequenceIndex: number) => {
            soundMap[sequenceIndex] = soundName + pitch
            const sequence = sequences[sequenceIndex]
            const event = () => playSound([soundName + pitch, '16N'])
            sequences[sequenceIndex] = sequence.map(cell => cell ? event : cell)
            return sequences
        }
    }

    const UIProps: UIProps = {
        handlers: UIHandlers,
        sequences: sequences,
        soundNames: soundNames,
        defaultSound: defaultSound,
    }

    return {
        UIProps: UIProps,
    }

}

const app = App()

export default app

