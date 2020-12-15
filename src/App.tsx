import React from 'react'
import './App.css'
import Grid from './components/Grid'
import Controller from './controller'
import { Sound, sounds } from './synthesizer'
import { Sequences } from './sequencer'

  const controller = new Controller()
  const sequencer = controller.sequencer

  const App = () => {
 
    const [sequences, setSequences] = React.useState<Sequences>(sequencer.sequences)

    const soundMap = React.useRef({
      0: 0,
      1: 1,
      2: 2,
      3: 3,
    })

    const handleCellClick = (sequenceIndex: number, stepIndex: number) => {
      sequencer.placeSound(sequenceIndex, stepIndex, sequenceIndex)
      setSequences([...sequencer.sequences])
    }

    const handleAddRow = () => {
      sequencer.addSequence()
      setSequences([...sequencer.sequences])
    }

    const soundSelects = sequences.map(sequence =>
      <SoundSelect sounds={sounds} />
    )

    const handlePlay = () => sequencer.play(soundMap.current)

    return (
      <div>
        <button onClick={handleAddRow}>Add row</button>
        <button onClick={handlePlay}>Play</button>
        <button onClick={sequencer.loop.bind(sequencer)}>Loop</button>
        <button onClick={sequencer.stopLoop.bind(sequencer)}>Stop loop</button>
        <div className="sequencer">
          <div>
            {soundSelects}
          </div>
          <Grid sequences={sequences} onCellClick={handleCellClick}/>
        </div>
      </div>
    )
}

const SoundSelect = ({sounds}: {sounds: Array<Sound>}) =>
  <select >
    {sounds.map(sound => <option>{sound[0]}</option>)}
  </select>


export default App
