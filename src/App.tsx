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
  const [currentStep, setCurrentStep] = React.useState<number>(handlers.getCurrentState().step)
  const [playing, setPlaying] = React.useState<boolean>(handlers.getCurrentState().isPlaying)

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
    // Fix sleep time either to backend state or - if first step - to 0.
    const partialInterval = (f: () => void) =>
      setInterval(f, playing 
        ? handlers.getCurrentState().sleepTime 
        : 0
      )
    partialInterval(() => {
      const { step, isPlaying } = handlers.getCurrentState()
      setPlaying(isPlaying)
      setCurrentStep(handlers.getCurrentState().step)
    })
  }

  const handleStop = () => {
    handlers.onStop()
  }

  return (
    <div className="sequencer">
      <div className="sequencer-controls">
        <button onClick={handlePlay}>Play</button>
        <button onClick={handleStop}>Stop</button>
    
        <label className="silver">Sequences</label>
        <button onClick={handleAddSequence} className='plusminus'>+</button>
        <button onClick={() => handleRemoveSequence(seqs.length - 1)} className="plusminus">-</button>

        <label className="silver">Steps</label>
        <button onClick={handleAddStep} className="plusminus">+</button>
        <button onClick={handleRemoveStep} className="plusminus">-</button>

        <label>Tempo</label>
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
                    ? cellIndex === currentStep && playing ? 'grid-cell filled active': 'grid-cell filled'
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
        min="1"
        max="9"
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
