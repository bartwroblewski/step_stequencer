import React from 'react'
import './App.css'
import './components/Grid.css'

import { UIProps } from './app/App'
import { Sequence, makeSequence } from './app/Sequence'

//import Test, { UIHandlers } from './components/Test'

const App: React.FC<UIProps> = ({handlers, sequences, soundNames, defaultEvent}: UIProps) => {
 
  const [seqs, setSeqs] = React.useState<Sequence[]>(sequences)

  React.useEffect(() => console.log(seqs), [seqs])
  
  const handleAddSequence = () => {
    const newSequences = handlers.onAddSequence()  
    setSeqs([...newSequences])
  }

  const handleRemoveSequence = (sequenceIndex: number) => {
    const newSequences = handlers.onRemoveSequence(sequenceIndex)  
    setSeqs([...newSequences])
  }
  
  const handleCellClick = (seqIndex: number, cellIndex: number) => {
    const newSequences = handlers.onCellClick(seqIndex, cellIndex, defaultEvent)
    setSeqs([...newSequences])
  }

  const handleAddStep = () => {
    const newSequences = handlers.onAddStep()
    setSeqs(newSequences)
  }

  const handleRemoveStep = () => {
    const newSequences = handlers.onRemoveStep()
    setSeqs(newSequences)
  }

  const handlePlay = () => {
    handlers.onPlay()
  }

  const handleSoundSelectChange = (soundName: string, pitch: number, sequenceIndex: number) => {
    const newSequences = handlers.onSoundSelectChange(soundName, pitch, sequenceIndex)
    setSeqs([...newSequences])
  }

  const inputs = 
    <div className="inputs">
      {seqs.map((seq, seqIndex) =>
        <SoundSelect
          key={seqIndex}
          soundNames={soundNames}
          pitch={3}
          onChange={handleSoundSelectChange}
          sequenceIndex={seqIndex}
        />
      )}
    </div>

    const grid = 
    <div>
      {seqs.map((seq, seqIndex) => 
        <div className='grid-row'>
          {seq.map((cell, cellIndex) =>
            <div 
              className={cell ? 'grid-cell filled' : 'grid-cell'}
              onClick={() => handleCellClick(seqIndex, cellIndex)}>
            </div>
          )}
        </div>
      )}
    </div>

  return (
    <div>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleAddSequence}>Add sequence</button>
      <button onClick={() => handleRemoveSequence(seqs.length - 1)}>Remove sequence</button>
      Steps
      <button onClick={handleAddStep}>+</button>
      <button onClick={handleRemoveStep}>-</button>
      <div className="sequencer">
        {inputs}
        {grid}
      </div>
    </div>
  )
}

interface SoundSelectProps {
  soundNames: string[],
  pitch: number,
  onChange: any,
  sequenceIndex: number
}

const SoundSelect = ({soundNames, pitch, onChange, sequenceIndex}: SoundSelectProps) => {
  const [soundName, setSoundName] = React.useState<string>(soundNames[0])
  const [soundPitch, setSoundPitch] = React.useState<number>(3)

  const soundOptions = soundNames.map(name =>
    <option className='sound-select-option'>{name}</option>
  )

  return (
    <div className="input-group">
      <select 
        className='sound-select' 
        onChange={e => {
          const name = e.target.value
          setSoundName(name)
          onChange(name, soundPitch, sequenceIndex)
        }}
      >
      {soundOptions}
      </select>
      <input 
        className="pitch-input"
        type="number"
        min="0"
        max="5"
        value={soundPitch}
        onChange={e => {
          const pitch = parseInt(e.target.value)
          setSoundPitch(pitch)
          onChange(soundName, pitch, sequenceIndex)
        }}
      />
    </div>
  )
}

export default App
