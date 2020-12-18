import React from 'react'
import './App.css'
import './components/Grid.css'

import { AppProps } from './index'
import { Sequence, makeSequence } from './app/Sequence'

const App: React.FC<AppProps> = ({handlers, sequences}: AppProps) => {
 

  const [seqs, setSeqs] = React.useState<Sequence[]>(sequences)

  React.useEffect(() => console.log(seqs), [seqs])

  const grid = seqs.map(seq => 
    <div className='grid-row'>
      {seq.map(cell => <div className='grid-cell'></div>)}
    </div>
  )
  
  const addSequence = () => {
    const sequence = makeSequence(16, 500)
    const newSequences = handlers.handleAddSequence(sequence)
    setSeqs([...newSequences])
  }

  return (
    <div>
      <button onClick={addSequence}>Add sequence</button>
      {grid}
    </div>
  )
}

export default App
