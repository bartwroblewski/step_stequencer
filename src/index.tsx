import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Backend from './app/App'
import Sequence from './app/Sequence'

const app = Backend()
const sequencer = app.sequencer
const sequence1 = new Sequence({n_ticks: 16, tickDuration: 1000, event: () => console.log('sequence1')})
const sequence2 = new Sequence({n_ticks: 16, tickDuration: 500, event: () => console.log('sequence2')})
const sequence3 = new Sequence({n_ticks: 16, tickDuration: 2000, event: () => console.log('sequence3')})
const sequence4 = new Sequence({n_ticks: 16, tickDuration: 100, event: () => console.log('sequence4')})
sequencer.addSequence(sequence1)
sequencer.addSequence(sequence2)
sequencer.addSequence(sequence3)
sequencer.addSequence(sequence4)
//sequencer.startAllSequences()

export interface IAppOptions {
  handleAddSequence: (sequence: Sequence) => any,
}

const appOptions: IAppOptions = {
  handleAddSequence: sequencer.addSequence.bind(sequencer),
}

ReactDOM.render(
  <React.StrictMode>
    <App handleAddSequence={appOptions.handleAddSequence} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
