import React from 'react'
import * as Tone from 'tone'
import { createCallChain } from 'typescript'
import './App.css'

type Sound = [string, string]
type Step = Array<Sound>
type Steps = Array<Step>

const App = () => {

  const synth = new Tone.Synth().toDestination()

  const playSound = (sound: Sound) => {
    console.log('playing sound ', sound)
    synth.triggerAttackRelease(sound[0], sound[1])
  }

  Tone.start()

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const BPM = 120
  const INTERVAL = ((60 / BPM) / 4) * 1000 // 16th notes
  const DIVISION = 16 // 16th notes
  const LOOP_LENGTH = INTERVAL * (DIVISION + 2) // why + 2?

  const sounds: Array<Sound> = [
    ['C1', '16N'],
    ['D1', '16N'],
    ['E2', '16N'],
    ['F3', '16N'],
    ['G4', '16N'],
    ['A2', '16N'],
    ['G3', '16N'],
  ]

  const N_STEPS = 16

  //initial steps
  let steps: Steps = []
  for (let i=0;i<N_STEPS;i++) {
    let step: Step = []
    steps.push(step)
  }

  const addSoundToStep = (stepIndex: number, soundIndex: number) => {
    steps[stepIndex].push(sounds[soundIndex])
  }

  const kicks = [
    [0, 4],
    [4, 4],
    [8, 4],
    [12, 4],
  ]

  const snares = [
    [2, 6],
    [5, 6],
    [10,6],
    [14, 6],
  ]

  const hats = [
    [1, 5],
    [2, 5],
    [3, 5],
    [5, 5],
    [5, 5],
    [7, 5],
    [9, 5],
    [10, 5],
    [11, 5],
  ]

  kicks.forEach(kick => addSoundToStep(kick[0], kick[1]))
  snares.forEach(snare => addSoundToStep(snare[0], snare[1]))
  hats.forEach(hat => addSoundToStep(hat[0], hat[1]))

  const playStep = (step: Step) => {
    console.log('playing step ', step)
    step.forEach(playSound)
  }

  const playSteps = async() => {
    for (let step of steps) {
      playStep(step)
      await sleep(INTERVAL)
    }
  }

  return (
    <div>
      <button onClick={playSteps}>Play steps</button>
      <Grid />
    </div>
  )

}

const GridCell = ({row, col}: {row: number, col: number}) => {

  const handleClick = (e: any) => console.log(row, col)

  return (
    <div 
      className="grid-cell"
      onClick={handleClick}
    ></div>
  )
}

const GridStep = ({col}: {col: number}) => 
  <div className="grid-step">
        <GridCell row={0} col={col} />
        <GridCell row={1} col={col} />
        <GridCell row={2} col={col} />
        <GridCell row={3} col={col} />
  </div>

const Grid = () => { 

  const steps = []
  for (let i=0; i<16; i++) {
    steps.push(<GridStep key={i} col={i} />)
  }
  
  return (
    <div>
      {steps}
    </div>
  )
}     
    
  /*   <div className="grid">
      {steps.map(step => 
        <div className="grid-step">
          {step.map(x => 
            <div className="grid-cell"></div>
          )}
        </div>
      )}
    </div> */
  


export default App
