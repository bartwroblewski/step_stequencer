import React from 'react'
import './App.css'

import { UIProps } from './app/App'
import { Sequence } from './app/Sequence'

interface SoundSelectProps {
  soundNames: string[],
  name: string,
  pitch: number,
  onChange: any,
  sequenceIndex: number
}

const App: React.FC<UIProps> = ({handlers, sequences, soundNames, defaultSound, defaultBPM}: UIProps) => {
 
  const [seqs, setSeqs] = React.useState<Sequence[]>(sequences)
  const [currentStep, setCurrentStep] = React.useState<number>(handlers.getCurrentStep())
  
  const handleAddSequence = () => {
    const newSequences = handlers.onAddSequence()  
    setSeqs([...newSequences])
  }

  const handleRemoveSequence = (sequenceIndex: number) => {
    const newSequences = handlers.onRemoveSequence(sequenceIndex)  
    setSeqs([...newSequences])
  }
  
  const handleCellClick = (seqIndex: number, cellIndex: number) => {
    const newSequences = handlers.onCellClick(seqIndex, cellIndex)
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

  const handleSoundSelectChange = (soundName: string, pitch: number, sequenceIndex: number) => {
    const newSequences = handlers.onSoundSelectChange(soundName, pitch, sequenceIndex)
    setSeqs([...newSequences])
  }

  const handleBPMchange = (e: any) => {
    handlers.onBPMchange(parseInt(e.target.value))
  }

  const handlePlay = () => {
    handlers.onPlay()
    setInterval(() => setCurrentStep(handlers.getCurrentStep()), 100)
  }

  return (
    <div className="sequencer">
      <div className="sequencer-controls">
        <button onClick={handlePlay}>Play</button>
    
        <label className="silver">Sequences</label>
        <button onClick={handleAddSequence}>+</button>
        <button onClick={() => handleRemoveSequence(seqs.length - 1)}>-</button>

        <label className="silver">Steps</label>
        <button onClick={handleAddStep}>+</button>
        <button onClick={handleRemoveStep}>-</button>

        <label>BPM</label>
        <input 
          type="range"
          min="50"
          max="320"
          defaultValue={defaultBPM}
          onChange={handleBPMchange}
        />
      </div>
      <div className="sequencer-rows">
        {seqs.map((seq, seqIndex) => 
          <div key={seqIndex} className="sequencer-row">
            <SoundSelect
              key={seqIndex}
              soundNames={soundNames}
              name={defaultSound.name}
              pitch={defaultSound.pitch}
              onChange={handleSoundSelectChange}
              sequenceIndex={seqIndex}
            />
            <div className='grid-row'>
              {seq.map((cell, cellIndex) =>
                <div 
                  key={cellIndex}
                  className={cell 
                    ? cellIndex === currentStep ? 'grid-cell filled active': 'grid-cell filled'
                    : 'grid-cell'}
                  onClick={() => handleCellClick(seqIndex, cellIndex)}>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const SoundSelect = ({soundNames, name, pitch, onChange, sequenceIndex}: SoundSelectProps) => {
  const [soundName, setSoundName] = React.useState<string>(name)
  const [soundPitch, setSoundPitch] = React.useState<number>(pitch)

  const soundOptions = soundNames.map((n, index) =>
    <option key={index}>{n}</option>
  )

  return (
    <div>
      <select 
        defaultValue={soundName}
        className='black silver' 
        onChange={e => {
          const name = e.target.value
          setSoundName(name)
          onChange(name, soundPitch, sequenceIndex)
        }}
      >
        {soundOptions}
      </select>
      <input 
        className="black silver"
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
