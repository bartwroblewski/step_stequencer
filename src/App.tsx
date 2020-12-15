import React from 'react'
import './App.css'
import Grid from './components/Grid'
import { GridType } from './components/Grid'
import Controller from './controller'
import SoundSelect from './components/SoundSelect'
import { Sound } from './synthesizer'

  const controller = new Controller()

  const App = () => {

    let rowIndexVsSoundIndex: {[key: number]: number} = {
      0: 2,
      1: 1,
      2: 4,
      3: 6,
    }

    const attachSoundToRow = (rowIndex: number, soundIndex: number) => {
      rowIndexVsSoundIndex[rowIndex] = soundIndex
    }
 
    const soundSelects = Array.from(controller.usedSounds).map((sound: Sound, index: number) => {
      return (
        <SoundSelect
          key={index}
          id={index}
          onChange={(e: any) => attachSoundToRow(index, e.target.value)}
        />
      )
    })

    const [grid, setGrid] = React.useState<GridType>(controller.makeGrid())

    const handleCellClick = (stepIndex: number) => {
      controller.sequencer.addSoundToStep(stepIndex, 4)
      setGrid(controller.makeGrid())
    }

    const handlePlayClick = () =>
      controller.sequencer.playSteps()

    return (
      <div>
        <button onClick={handlePlayClick}>Play steps</button>
        <Grid grid={grid} onCellClick={handleCellClick}/>
        {soundSelects}
      </div>
    )
}

export default App
