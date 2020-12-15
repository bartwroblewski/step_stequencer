import React from 'react'
import './App.css'
import Grid from './components/Grid'
import Controller from './controller'
import SoundSelect from './components/SoundSelect'
import { Sound, sounds } from './synthesizer'

  const controller = new Controller()
  const sequencer = controller.sequencer

  const App = () => {
 
    const [sequences, setSequences] = React.useState<any>(sequencer.sequences)

    const handleCellClick = (sequenceIndex: number, stepIndex: number) => {
      console.log(sequenceIndex, stepIndex)
      sequencer.sequences[sequenceIndex][stepIndex] = sounds[0]
      setSequences([...sequencer.sequences])
    }

    return (
      <div>
        <button onClick={sequencer.play.bind(sequencer)}>Play</button>
        <button onClick={sequencer.loop.bind(sequencer)}>Loop</button>
        <button onClick={sequencer.stopLoop.bind(sequencer)}>Stop loop</button>
        <Grid sequences={sequences} onCellClick={handleCellClick}/>
      </div>
    )
}

export default App
