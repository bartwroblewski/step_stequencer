import { Event } from './Event'
import { Sequence, makeSequence } from './Sequence'
import { Sound, soundNames } from './Sound'
import { sleep } from './Event'
import * as Tone from 'tone'

interface UIHandlers {
    onAddSequence: () => Sequence[]
    onRemoveSequence: (sequenceIndex: number) => Sequence[]
    onCellClick: (seqIndex: number, cellIndex: number) => Sequence[],
    onAddStep: () => Sequence[],
    onRemoveStep: () => Sequence[],
    onPlay: () => void,
    onSoundSelectChange: (soundName: string, pitch: number, sequenceIndex: number) => Sequence[],
  }
  
  export interface UIProps {
    handlers: UIHandlers,
    sequences: Sequence[],
    soundNames: string[],
    defaultSound: {name: string, pitch: number},
  }

  interface ActionPayload {
    sequenceIndex?: number
    cellIndex?: number
    event?: any
  }
  
  interface Action {
    type: string,
    payload?: ActionPayload,
  }

const App = () => {

const sleepEvent: Event = () => sleep(100) // better to keep it in Event module and import here
Tone.start()
const bpm = 120
Tone.Transport.bpm.value = bpm;

const sleepTime = ((60 /bpm) / 4) * 1000 // works for 16th notes
let steps = 16

const synth = new Tone.Synth().toDestination()
const defaultSound = {name: 'D', pitch: 4}
const soundMap: {[key: number]: string} = {} // keeps track of sounds mapped to sequences. Updated on UI sound select change
const playSound: Event = (sound: Sound) => synth.triggerAttackRelease(sound[0], sound[1])
const playDefaultSound = () => playSound([defaultSound.name + defaultSound.pitch, '8N'])

const sequence1 = makeSequence(steps, 100)
const sequence2 = makeSequence(steps, 100)
const sequence3 = makeSequence(steps, 100)
const sequence4 = makeSequence(steps, 100)

let sequences: Sequence[] = [sequence1, sequence2, sequence3, sequence4]
const setSequences = (newSequences: Sequence[]): Sequence[] => {
  sequences = newSequences
  return sequences
}

sequences[0][3] = () => playDefaultSound()
sequences[1][7] = () => playDefaultSound()
sequences[2][11] = () => playDefaultSound()
sequences[3][15] = () => playDefaultSound()

const start = async(): Promise<any> => {
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

const reducer = (sequences: Sequence[], action: Action) => {
  switch (action.type) {

    case 'ADD SEQUENCE':
      const newSequence = makeSequence(steps, 100)
      return sequences.concat([newSequence])

    case 'REMOVE SEQUENCE':
      const seqIndex = action.payload?.sequenceIndex
      return sequences.filter((seq, index) => index !== seqIndex)

    case 'TOGGLE CELL':
      //const { sequenceIndex, cellIndex, event } = action.payload as ActionPayload
      const sequenceIndex = action.payload?.sequenceIndex as number
      const cellIndex = action.payload?.cellIndex as number
      const cell = sequences[sequenceIndex][cellIndex]
      const sound = soundMap[sequenceIndex]
      const event = () => sound ? playSound([sound, '16N']) : playDefaultSound()
      sequences[sequenceIndex][cellIndex] = cell ? null : event
      return sequences
  }
  return sequences
}

const addSequenceReducer = () => reducer(sequences, {type: 'ADD SEQUENCE'})
// make reducer factory here ?

const addSequence = (): Sequence[] => sequences = addSequenceReducer()
const removeSequence = (sequenceIndex: number): Sequence[] => sequences = reducer(sequences, {type: 'REMOVE SEQUENCE', payload: {sequenceIndex: sequenceIndex}})
const toggleCell = (seqIndex: number, cellIndex: number): Sequence[] => sequences = reducer(sequences, {type: 'TOGGLE CELL', payload: {sequenceIndex: seqIndex, cellIndex: cellIndex}})

const UIHandlers: UIHandlers = {
  onAddSequence: addSequence,
  onRemoveSequence: removeSequence,
  onCellClick: toggleCell,
  onAddStep: () => {
    steps += 1
    return setSequences(sequences.map(seq => seq.concat(null)))
  },
  onRemoveStep: () => {
    steps -= 1
    sequences = sequences.map(seq => seq.slice(0, -1))
    return sequences
  },
  onPlay: () => start(),
  onSoundSelectChange: (soundName: string, pitch: number, sequenceIndex: number) => {
    soundMap[sequenceIndex] = soundName + pitch
    const sequence = sequences[sequenceIndex]
    const event = () => playSound([soundName + pitch, '8N'])
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

