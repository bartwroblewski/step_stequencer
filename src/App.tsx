import React from 'react'
import './App.css'
import './components/Grid.css'

import { UIProps } from './index'
import { Sequence, makeSequence } from './app/Sequence'

const App: React.FC<UIProps> = ({handlers, sequences}: UIProps) => {
 

  const [seqs, setSeqs] = React.useState<Sequence[]>(sequences)

  React.useEffect(() => console.log(seqs), [seqs])
  
  const handleAddSequence = () => {
    const sequence = makeSequence(16, 500)
    const newSequences = handlers.onAddSequence(sequence)
    setSeqs([...newSequences])
  }
  
  const handleCellClick = (seqIndex: number, cellIndex: number) => {
    const newSequence = handlers.onCellClick(seqIndex, cellIndex)
    const newSequences = [...seqs]
    newSequences[seqIndex] = newSequence
    setSeqs(newSequences)
  }

  const grid = seqs.map((seq, seqIndex) => 
    <div className='grid-row'>
      {seq.map((cell, cellIndex) => <div className='grid-cell' onClick={() => handleCellClick(seqIndex, cellIndex)}></div>)}
    </div>
  )

  return (
    <div>
      <button onClick={handleAddSequence}>Add sequence</button>
      {grid}
    </div>
  )
}

export default App
