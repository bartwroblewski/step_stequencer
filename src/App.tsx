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

  const handleSoundSelectChange = (soundName: string, sequenceIndex: number) => {
    const newSequences = handlers.onSoundSelectChange(soundName, sequenceIndex)
    setSeqs([...newSequences])
  }

  const inputs = 
    <div className="inputs">
      {seqs.map((seq, seqIndex) =>
        <div className="input-group">
          <select className='sound-select' onChange={e => handleSoundSelectChange(e.target.value, seqIndex)}>
            {soundNames.map(soundName =>
              <option className='sound-select-option'>{soundName}</option>
            )}
          </select>
          <input 
            className="pitch-input"
            type="number"
            min="0"
            max="5"
            defaultValue="3"
          />
        </div>
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

export default App
