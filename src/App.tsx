import React from 'react'
import './App.css'
import Grid from './components/Grid'
import Sequencer from './sequencer'

  const App = () => {

    const sequencer = Sequencer()

    return (
      <div>
        <button onClick={sequencer.playSteps}>Play steps</button>
        <Grid steps={sequencer.steps} />
      </div>
    )
}

export default App
