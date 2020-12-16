import React from 'react'
import './App.css'
import Grid from './components/Grid'
import Controller from './controller'
import { Sound, sounds } from './synthesizer'
import { Sequences } from './sequencer'
import { controller } from './index'

  const App = () => {
 
    const [sequences, setSequences] = React.useState<Sequences>(controller.sequencer.sequences)

    const handleCellClick = (sequenceIndex: number, stepIndex: number) => {
      controller.sequencer.placeSound(sequenceIndex, stepIndex)
      setSequences([...controller.sequencer.sequences])
    }

    const handleAddRow = () => {
      controller.sequencer.addSequence()
      setSequences([...controller.sequencer.sequences])
    }
    
    const handleSelectChange = (e: any) => {
      const sound = sounds.filter(sound => sound[0] === e.target.value)[0]
      const soundIndex = sounds.indexOf(sound)
      controller.soundMap[e.target.id] = soundIndex
    }

    const soundSelects = sequences.map((sequence, sequenceIndex) =>
      <SoundSelect id={sequenceIndex} sounds={sounds} onChange={handleSelectChange} />
    )

    const handlePlay = () => controller.sequencer.play()
    const handleLoop = () => controller.sequencer.loop()
    const handleStopLoop = () => controller.sequencer.stopLoop()

    return (
      <div>
        <button onClick={handleAddRow}>Add row</button>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handleLoop}>Loop</button>
        <button onClick={handleStopLoop}>Stop loop</button>
        <div className="sequencer">
          <div>
            {soundSelects}
          </div>
          <Grid sequences={sequences} onCellClick={handleCellClick}/>
        </div>
      </div>
    )
}

const SoundSelect = ({id, sounds, onChange}: {id: number, sounds: Array<Sound>, onChange: any}) =>
  <select 
    id={JSON.stringify(id)}
    onChange={(e: any) => onChange(e)}
  > 
    {sounds.map(sound => <option>{sound[0]}</option>)}
  </select>


export default App
