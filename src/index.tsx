import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Backend from './app/App'
import { Event } from './app/Event'
import { Sequence, makeSequence, addSequence } from './app/Sequence'
import * as Tone from 'tone'


Tone.start()
const synth = new Tone.Synth().toDestination()
const playSound = (pitch: string) => synth.triggerAttackRelease(pitch, '16N')

const app = Backend()
const sequencer = app.sequencer

const sequence1 = makeSequence(16, 100)
const sequence2 = makeSequence(16, 100)
const sequence3 = makeSequence(16, 100)
const sequence4 = makeSequence(16, 100)

let sequences = [sequence1, sequence2, sequence3, sequence4]
const setSequences = (newSequences: Sequence[]) => {
  sequences = newSequences
  return sequences
}

sequences[0][3] = () => playSound('C3')
sequences[1][7] = () => playSound('E3')
sequences[2][11] = () => playSound('G3')
sequences[3][15] = () => playSound('B3')

sequencer.addSequence(sequences[0])
sequencer.addSequence(sequences[1])
sequencer.addSequence(sequences[2])
sequencer.addSequence(sequences[3])

//sequencer.startAllSequences()

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
  onCellClick: (seqIndex: number, cellIndex: number, event: Event) => sequencer.changeSequence(seqIndex, cellIndex, event),
  onPlay: sequencer.startAllSequences.bind(sequencer),
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
