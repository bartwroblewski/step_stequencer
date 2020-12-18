import React from 'react'
import './App.css'
import { AppProps } from './index'
import { makeSequence } from './app/Sequence'

const App: React.FC<AppProps> = ({handlers}: AppProps) => {
  const sequence1 = makeSequence(16, 500)
  return (
    <div>
      <button onClick={() => handlers.handleAddSequence(sequence1)}>add sequence</button>
    </div>
  )
}

export default App
