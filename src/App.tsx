import React from 'react'
import './App.css'
import './components/Grid.css'

import { UIProps } from './index'
import { Sequence, makeSequence } from './app/Sequence'

const App: React.FC<UIProps> = ({handlers, sequences, defaultEvent}: UIProps) => {
 
  const [seqs, setSeqs] = React.useState<Sequence[]>(sequences)

  React.useEffect(() => console.log(seqs), [seqs])
  
  const handleAddSequence = () => {
    const newSequences = handlers.onAddSequence()  
    setSeqs([...newSequences])
  }
  
  const handleCellClick = (seqIndex: number, cellIndex: number) => {
    const newSequences = handlers.onCellClick(seqIndex, cellIndex, defaultEvent)
    setSeqs(newSequences)
  }

  const grid = 
    <div>
      {seqs.map((seq, seqIndex) => 
        <div className='grid-row'>
          {seq.map((cell, cellIndex) =>
            <div 
              className={cell.name === 'sleepEvent' ? 'grid-cell' : 'grid-cell filled'}
              onClick={() => handleCellClick(seqIndex, cellIndex)}>
            </div>
          )}
        </div>
      )}
    </div>

  const handlePlay = () => {
    handlers.onPlay()
  }

  const soundSelects = 
    <div className="sound-selects">
      {sequences.map((seq, seqIndex) =>
        <select className='sound-select'>
          <option className='sound-select-option'>fg</option>
        </select>
      )}
    </div>

  return (
    <div>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleAddSequence}>Add sequence</button>
      <div className="sequencer">
        {soundSelects}
        {grid}
      </div>
    </div>
  )
}

export default App
