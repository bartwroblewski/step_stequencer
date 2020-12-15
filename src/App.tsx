import React from 'react'
import './App.css'
import Grid from './components/Grid'
import Controller from './controller'
import SoundSelect from './components/SoundSelect'
import { Sound, sounds } from './synthesizer'
import { Sequences } from './sequencer'

  const controller = new Controller()
  const sequencer = controller.sequencer

  const App = () => {
 
    const [sequences, setSequences] = React.useState<Sequences>(sequencer.sequences)

    const handleCellClick = (sequenceIndex: number, stepIndex: number) => {
      sequencer.placeSound(sequenceIndex, stepIndex)
      setSequences([...sequencer.sequences])
    }

    const handleAddRow = () => {
      sequencer.addSequence()
      setSequences([...sequencer.sequences])
    }

    return (
      <div>
        <button onClick={handleAddRow}>Add row</button>
        <button onClick={sequencer.play.bind(sequencer)}>Play</button>
        <button onClick={sequencer.loop.bind(sequencer)}>Loop</button>
        <button onClick={sequencer.stopLoop.bind(sequencer)}>Stop loop</button>
        <Grid sequences={sequences} onCellClick={handleCellClick}/>
      </div>
    )
}

export default App
