import React from 'react'
import * as Tone from 'tone'
import './App.css'

type Sound = string[]

type SeqCol = Sound[]

type Seq = SeqCol[]

const synth = new Tone.Synth().toDestination()

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const BPM = 150
const INTERVAL = ((60 / BPM) / 4) * 1000 // 16th notes
const DIVISION = 16 // 16th notes
const LOOP_LENGTH = INTERVAL * (DIVISION + 2) // why + 2?

const App = () => {

  const getEmptySeq = (): Seq => {
    const seq: Seq = []
    for (let i=0; i<DIVISION; i++) {
      const col: SeqCol = [
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
      ]
      seq.push(col)
    }
    return seq
  }

  const [seq, setSeq] = React.useState<Seq>(getEmptySeq())

  const sounds = [
    ["C3", "16n"],
    ["D4", "16n"],
    ["E2", "16n"],
    ["F4", "16n"],
  ]

  const placeSound = (col: number, row: number) => {
      const newSeq: Seq = [...seq]
      newSeq[col][row] = sounds[row]
      setSeq(newSeq)
  }

  const removeSample = (col: number, row: number) => {
    const newSeq: Seq = [...seq]
    newSeq[col][row] = ['', '']
    setSeq(newSeq)
  }

  const playSound = (sound: Sound) => {
    if (sound[0]) {
      synth.triggerAttackRelease(sound[0], sound[1])
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

  const grid = seq.map((col, colIndex) => {
    const sounds = col.map((sound, rowIndex) => {
      return (
        sound[0]
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

  return (
    <div>
      {grid}
      <button type="button" onClick={loop}>Play</button>
    </div>
  )
}

export default App;
