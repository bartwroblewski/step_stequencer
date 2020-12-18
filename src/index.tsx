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
const playSound = () => synth.triggerAttackRelease('C3', '16N')

const app = Backend()
const sequencer = app.sequencer
const sequence1 = makeSequence(16)
sequence1[5] = playSound
sequencer.addSequence(sequence1)

sequencer.startAllSequences()

interface AppHandlers {
  handleAddSequence: (sequence: Sequence) => any
}

export interface AppProps {
  handlers: AppHandlers,
}

const appHandlers: AppHandlers = {
  handleAddSequence: sequencer.addSequence.bind(sequencer)
}

const appProps: AppProps = {
  handlers: appHandlers,
}

ReactDOM.render(
  <React.StrictMode>
    <App handlers={appProps.handlers} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
