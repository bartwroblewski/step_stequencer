import React from 'react'
import './App.css'
import Grid from './components/Grid'
import { playSteps, steps } from './sequencer'

  const App = () => {
    return (
      <div>
        <button onClick={playSteps}>Play steps</button>
        <Grid steps={steps} />
      </div>
    )
}

export default App
