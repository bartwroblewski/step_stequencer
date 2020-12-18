import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Backend from './app/App'
import { Sequence, makeSequence } from './app/Sequence'
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

sequence1[3] = () => playSound('C3')
sequence2[7] = () => playSound('E3')
sequence3[11] = () => playSound('G3')
sequence4[15] = () => playSound('B3')

sequencer.addSequence(sequence1)
sequencer.addSequence(sequence2)
sequencer.addSequence(sequence3)
sequencer.addSequence(sequence4)

//sequencer.startAllSequences()

interface AppHandlers {
  onAddSequence: (sequence: Sequence) => any
}

export interface AppProps {
  handlers: AppHandlers,
  sequences: Sequence[],
}

const appHandlers: AppHandlers = {
  onAddSequence: sequencer.addSequence.bind(sequencer)
}

const appProps: AppProps = {
  handlers: appHandlers,
  sequences: sequencer.sequences,
}

ReactDOM.render(
  <React.StrictMode>
    <App 
      handlers={appProps.handlers}
      sequences={appProps.sequences}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
