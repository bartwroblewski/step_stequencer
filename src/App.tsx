import React from 'react'
import * as Tone from 'tone'
import './App.css'

type Sound = string[]

type SeqCol = Sound[]

type Seq = SeqCol[]

const synth = new Tone.Synth().toDestination()

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const App = () => {

  const getEmptySeq = (): Seq => {
    const seq: Seq = []
    for (let i=0; i<16; i++) {
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
    ["C4", "8n"],
    ["D4", "8n"],
    ["E4", "8n"],
    ["F4", "8n"],
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
    synth.triggerAttackRelease(sound[0], sound[1])
  }

  const handleContextMenu = (e: any, rowIndex: number, colIndex: number) => {
    e.preventDefault()
    removeSample(colIndex, rowIndex)
  }

  const playSeq = async() => {
    for (let col of seq) {
      await sleep(500)
      for (let sound of col) {
        playSound(sound)
      }
    }
  }
  
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
      <button type="button" onClick={playSeq}>Play</button>
    </div>
  )
}

export default App;
