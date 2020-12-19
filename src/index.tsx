import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Event } from './app/Event'
import { Sequence, makeSequence } from './app/Sequence'
import { Sound } from './app/Sound'
import { sleep } from './app/Event'
import * as Tone from 'tone'

Tone.start()
const bpm = 120
Tone.Transport.bpm.value = bpm;

const sleepTime = ((60 /bpm) / 4) * 1000 // works for 16th notes
let steps = 16

const synth = new Tone.Synth().toDestination()
const playSound: Event = (sound: Sound) => synth.triggerAttackRelease(sound[0], sound[1])

const sequence1 = makeSequence(steps, 100)
const sequence2 = makeSequence(steps, 100)
const sequence3 = makeSequence(steps, 100)
const sequence4 = makeSequence(steps, 100)

let sequences: Sequence[] = [sequence1, sequence2, sequence3, sequence4]
const setSequences = (newSequences: Sequence[]): Sequence[] => {
  sequences = newSequences
  return sequences
}

const soundNames: string[] = ['C', 'D', 'E', 'F', 'G', 'B']

const soundOnSequence = {}

sequences[0][3] = () => playSound(['C3', '8N'])
sequences[1][7] = () => playSound(['E3', '8N'])
sequences[2][11] = () => playSound(['G3', '8N'])
sequences[3][15] = () => playSound(['B3', '8N'])

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

const replaceSequenceEvent = (seqIndex: number, cellIndex: number, event: Event): Sequence[] => {
  return setSequences(
    sequences.map((seq, index) => seqIndex === index
      ? seq.map((cell, index) => index === cellIndex
          ? event 
          : cell
        )
      : seq
    )
  )
} 

const addSequence = (sequence: Sequence): Sequence[] => setSequences(sequences.concat([sequence]))

interface UIHandlers {
  onAddSequence: () => Sequence[]
  onCellClick: (seqIndex: number, cellIndex: number, event: Event) => Sequence[],
  onAddStep: () => Sequence[],
  onRemoveStep: () => Sequence[]
  onPlay: () => void
}

export interface UIProps {
  handlers: UIHandlers,
  sequences: Sequence[],
  soundNames: string[],
  defaultEvent: Event,
}

const sleepEvent: Event = () => sleep(100) // better to keep it in Event module and import here

const UIHandlers: UIHandlers = {
  onAddSequence: () => addSequence(makeSequence(16, 100)),
  onCellClick: (seqIndex: number, cellIndex: number, event: Event) => replaceSequenceEvent(seqIndex, cellIndex, event),
  onAddStep: () => {
    steps += 1
    return setSequences(sequences.map(seq => seq.concat(null)))
  },
  onRemoveStep: () => {
    steps -= 1
    return setSequences(sequences.map(seq => seq.slice(0, -1)))
  },
  onPlay: () => start(),
}

const UIProps: UIProps = {
  handlers: UIHandlers,
  sequences: sequences,
  soundNames: soundNames,
  defaultEvent: () => playSound(['C3', '8N']),
}

ReactDOM.render(
  <React.StrictMode>
    <App 
      handlers={UIProps.handlers}
      sequences={UIProps.sequences}
      soundNames={UIProps.soundNames}
      defaultEvent={UIProps.defaultEvent}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
