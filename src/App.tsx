import React from 'react'
import './App.css'
import Grid from './components/Grid'
import { GridType } from './components/Grid'
import Controller from './controller'
import SoundSelect from './components/SoundSelect'
import { Sound } from './synthesizer'

  const controller = new Controller()
  const sequencer = controller.sequencer

  const App = () => {
 
    const [grid, setGrid] = React.useState<GridType>([])

    return (
      <div>
        <Grid grid={grid}/>
        <button onClick={sequencer.play.bind(sequencer)}>Play</button>
      </div>
    )
}

export default App
