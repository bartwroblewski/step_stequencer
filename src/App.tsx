import React from 'react'
import * as Tone from 'tone'
import './App.css'

const App = () => {

  const synth = new Tone.Synth().toDestination()

  Tone.start()

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const BPM = 120
  const INTERVAL = ((60 / BPM) / 4) * 1000 // 16th notes
  const DIVISION = 16 // 16th notes
  const LOOP_LENGTH = INTERVAL * (DIVISION + 2) // why + 2?


  type Sound = [string, string]
  const sounds: Array<Sound> = [
    ['C1', '16N'],
    ['D1', '16N'],
    ['E2', '16N'],
    ['F3', '16N'],
    ['G4', '16N'],
    ['A2', '16N'],
    ['G3', '16N'],
  ]

  const playSound = (sound: Sound) => console.log('playing sound ', sound)
  
  const N_STEPS = 16

  type Step = Array<Sound>
  type Steps = Array<Step>

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
    [0, 1],
    [4, 1],
    [8, 1],
    [12, 1],
  ]

  kicks.forEach(kick => addSoundToStep(kick[0], kick[1]))

  const playStep = (step: Step, stepIndex: number) => {
    console.log('playing step ', stepIndex, step)
    step.forEach(playSound)
  }
  const playSteps = () => steps.forEach(playStep)

  return <button onClick={playSteps}>Play steps</button>

}

export default App
