import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Event } from './app/Event'
import { Sequence, makeSequence } from './app/Sequence'
import * as Tone from 'tone'

import test from './components/Test'
//test()

Tone.start()
const synth = new Tone.Synth().toDestination()
const playSound = (pitch: string) => synth.triggerAttackRelease(pitch, '16N')

const sequence1 = makeSequence(16, 100)
const sequence2 = makeSequence(16, 100)
const sequence3 = makeSequence(16, 100)
const sequence4 = makeSequence(16, 100)

let sequences = [sequence1, sequence2, sequence3, sequence4]
const setSequences = (newSequences: Sequence[]): Sequence[] => {
  sequences = newSequences
  console.log(sequences)
  return sequences
}

sequences[0][3] = () => playSound('C3')
sequences[1][7] = () => playSound('E3')
sequences[2][11] = () => playSound('G3')
sequences[3][15] = () => playSound('B3')

const startSequence = async(sequence: Sequence): Promise<any> => {
  for(let i=0; i<sequence.length; i++) {
      const event = sequence[i]
      await event()
  }
}
const startSequences = (sequences: Sequence[]): void => sequences.forEach(startSequence)

interface UIHandlers {
  onAddSequence: () => Sequence[]
  onCellClick: (seqIndex: number, cellIndex: number, event: Event) => Sequence,
  onPlay: () => void
}

export interface UIProps {
  handlers: UIHandlers,
  sequences: Sequence[],
  defaultEvent: Event,
}

const UIHandlers: UIHandlers = {
  onAddSequence: () => setSequences(sequences.concat([makeSequence(16, 100)])),
  onCellClick: (seqIndex: number, cellIndex: number, event: Event) => setSequences(
    sequences.map((seq, index) => seqIndex === index
    ? seq.map((cell, index) => index === cellIndex
        ? event 
        : cell
      )
    : seq 
  )),
  onPlay: () => startSequences(sequences),
}

const UIProps: UIProps = {
  handlers: UIHandlers,
  sequences: sequences,
  defaultEvent: () => playSound('C3'),
}

ReactDOM.render(
  <React.StrictMode>
    <App 
      handlers={UIProps.handlers}
      sequences={UIProps.sequences}
      defaultEvent={UIProps.defaultEvent}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
