import React from 'react'
import './App.css'
import { playSteps, steps} from './sequencer'
import Grid from './components/Grid'

const App = () => {
  return (
    <div>
      <button onClick={playSteps}>Play steps</button>
      <Grid steps={steps} />
    </div>
  )
}

export default App
