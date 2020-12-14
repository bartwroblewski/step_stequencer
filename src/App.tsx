import React from 'react'
import './App.css'
import Grid from './components/Grid'
import Sequencer from './sequencer'
import { Step } from './sequencer'
import SoundSelect from './components/SoundSelect'
import { sounds, Sound } from './synthesizer'

  const App = () => {

    const sequencer = Sequencer()
    const longestStepLength = Math.max(...sequencer.steps.map(step => step.length))
    const n_gridRows = longestStepLength

    let rowIndexVsSoundIndex: {[key: number]: number} = {
      0: 2,
      1: 1,
      2: 4,
      3: 6,
    }
    const reversed: any = {}
    for (const [key, value] of Object.entries(rowIndexVsSoundIndex)) {
      reversed[value] = key
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

    type GridStepCell = Sound | null
    type GridStep = Array<GridStepCell>
    const stepToGridStep = (step: Step) => {
      const gridStep: GridStep = [null, null, null, null]
      for (let sound of step) {
        const insertAt = reversed[sounds.indexOf(sound)]
        gridStep[insertAt] = sound
      }
      return gridStep
    }
    const grid = sequencer.steps.map(stepToGridStep)
    console.log(grid)

    return (
      <div>
        <button onClick={sequencer.playSteps}>Play steps</button>
        <Grid steps={sequencer.steps} />
        {soundSelects}
      </div>
    )
}

export default App
