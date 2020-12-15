import React from 'react'
import './App.css'
import Grid from './components/Grid'
import Controller from './controller'
import { Sound, sounds } from './synthesizer'
import { Sequences } from './sequencer'

  const controller = new Controller()
  const sequencer = controller.sequencer
  let soundMap: {[key: number]: number} = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
  }

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
    
    const handleSelectChange = (e: any) => {
      const sound = sounds.filter(sound => sound[0] === e.target.value)[0]
      const soundIndex = sounds.indexOf(sound)
      soundMap = {...soundMap, ...{[e.target.id]: soundIndex}}
    }

    const soundSelects = sequences.map((sequence, sequenceIndex) =>
      <SoundSelect id={sequenceIndex} sounds={sounds} onChange={handleSelectChange} />
    )

    const handlePlay = () => sequencer.play(soundMap)

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

const SoundSelect = ({id, sounds, onChange}: {id: number, sounds: Array<Sound>, onChange: any}) =>
  <select 
    defaultValue={sounds[soundMap[id]][0]}
    id={JSON.stringify(id)}
    onChange={(e: any) => onChange(e)}
  > 
    {sounds.map(sound => <option>{sound[0]}</option>)}
  </select>


export default App
