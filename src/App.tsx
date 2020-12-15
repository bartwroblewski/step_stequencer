import React from 'react'
import './App.css'
import Grid from './components/Grid'
import { GridType } from './components/Grid'
import Controller from './controller'
import { Step } from './sequencer'
import SoundSelect from './components/SoundSelect'
import { sounds, Sound } from './synthesizer'

  const App = () => {

    const controller = Controller()
    const longestStepLength = Math.max(...controller.sequencer.steps.map(step => step.length))

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

    return (
      <div>
        <button onClick={controller.sequencer.playSteps}>Play steps</button>
        <Grid grid={grid} onCellClick={handleCellClick}/>
        {soundSelects}
      </div>
    )
}

export default App
