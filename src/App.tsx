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

    sequencer.sequences[1][5] = 0
    console.log(sequencer.sequences)

    return (
      <div>
        <Grid grid={grid}/>
      </div>
    )
}

export default App
