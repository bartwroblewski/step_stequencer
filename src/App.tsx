import React from 'react'
import './App.css'
import Grid from './components/Grid'
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
 
    let soundSelects = []
    for (let i=0; i<longestStepLength; i++) {
      soundSelects.push(
        <SoundSelect
          key={i}
          id={i}
          onChange={(e: any) => attachSoundToRow(i, e.target.value)}
        />)
    }

    const grid = controller.makeGrid()

    return (
      <div>
        <button onClick={controller.sequencer.playSteps}>Play steps</button>
        <Grid grid={grid} />
        {soundSelects}
      </div>
    )
}

export default App
