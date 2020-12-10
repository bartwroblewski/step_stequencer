import React from 'react'
import * as Tone from 'tone'
import './App.css'
import { Sound, SoundSelect } from './components/SoundSelect'

type SeqCol = Sound[]

type Seq = SeqCol[]

const synth = new Tone.Synth().toDestination()

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const BPM = 120
const INTERVAL = ((60 / BPM) / 4) * 1000 // 16th notes
const DIVISION = 16 // 16th notes
const LOOP_LENGTH = INTERVAL * (DIVISION + 2) // why + 2?

const App = () => {

  const getEmptySeq = (): Seq => {
    const seq: Seq = []
    for (let i=0; i<DIVISION; i++) {
      const col: SeqCol = [
        {pitch: '', length: ''},
        {pitch: '', length: ''},
        {pitch: '', length: ''},
        {pitch: '', length: ''},
      ]
      seq.push(col)
    }
    return seq
  }

  const [seq, setSeq] = React.useState<Seq>(getEmptySeq())

  const [sounds, setSounds] = React.useState([
    {pitch: "C3", length: "16n"},
    {pitch: "D4", length: "16n"},
    {pitch: "E2", length: "16n"},
    {pitch: "F4", length: "16n"},
  ])

  const placeSound = (col: number, row: number) => {
      const newSeq: Seq = [...seq]
      newSeq[col][row] = sounds[row]
      setSeq(newSeq)
  }

  const removeSample = (col: number, row: number) => {
    const newSeq: Seq = [...seq]
    newSeq[col][row] = {pitch: '', length: ''}
    setSeq(newSeq)
  }

  const playSound = (sound: Sound) => {
    if (sound.pitch) {
      synth.triggerAttackRelease(sound.pitch, sound.length)
    }
  }

  const handleContextMenu = (e: any, rowIndex: number, colIndex: number) => {
    e.preventDefault()
    removeSample(colIndex, rowIndex)
  }

  const playSeq = async() => {
    for (let col of seq) {
      await sleep(INTERVAL)
      for (let sound of col) {
        playSound(sound)
      }
    }
  }

  const loop = () => setInterval(playSeq, LOOP_LENGTH)

  const soundSelects = sounds.map(sound => {
    return (
      <SoundSelect
        sounds={sounds}
        setSounds={setSounds}
      />
    )
    })

  const grid = seq.map((col, colIndex) => {
    const sounds = col.map((sound, rowIndex) => {
      return (
        sound.pitch
          ? <div onClick={(e) => playSound(sound)} onContextMenu={e => handleContextMenu(e, rowIndex, colIndex)} className='sample filled'></div>
          : <div onClick={() => placeSound(colIndex, rowIndex)} className='sample empty'></div>
      )
    })
    return (
      <div className='grid'>
        {sounds}
      </div>
    )
  })

  React.useEffect(() => console.log(sounds), [sounds])

  return (
    <div>
      {soundSelects}
      {grid}
      <button type="button" onClick={loop}>Play</button>
    </div>
  )
}

export default App;
