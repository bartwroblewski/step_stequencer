import React from 'react'
import './App.css'
import { AppProps } from './index'
import Sequence from './app/Sequence'

const App: React.FC<AppProps> = ({handleAddSequence}: AppProps) => {
  const sequence1 = new Sequence({n_ticks: 16, tickDuration: 1000, event: () => console.log('sequence1')})
  return (
    <div>
      <button onClick={() => handleAddSequence(sequence1)}>add sequence</button>
    </div>
  )
}

export default App
