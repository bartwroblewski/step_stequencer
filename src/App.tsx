import React from 'react'
import './App.css'
import './components/Grid.css'

import { AppProps } from './index'
import { Sequence, makeSequence } from './app/Sequence'

const App: React.FC<AppProps> = ({handlers, sequences}: AppProps) => {
  const sequence1 = makeSequence(16, 500)

  const [seqs, setSeqs] = React.useState<Sequence[]>(sequences)

  React.useEffect(() => console.log(seqs), [seqs])

  const grid = seqs.map(seq => 
    <div className='grid-row'>
      {seq.map(cell => <div className='grid-cell'></div>)}
    </div>
  )

  return (
    <div>
      <button onClick={() => handlers.handleAddSequence(sequence1)}>add sequence</button>
      {grid}
    </div>
  )
}

export default App
