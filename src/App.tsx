import React from 'react'
import * as Tone from 'tone'
import './App.css'

type Sample = {
  url: string,
  velocity: number,
  length: number,
}

type SeqCol = Sample[]

type Seq = SeqCol[]

const synth = new Tone.Synth().toDestination()

const App = () => {

  const getEmptySeq = (): Seq => {
    const seq: Seq = []
    for (let i=0; i<16; i++) {
      const col: SeqCol = [
        {url: '', velocity: 100, length: 100},
        {url: '', velocity: 100, length: 100}, 
        {url: '', velocity: 100, length: 100},
        {url: '', velocity: 100, length: 100},
      ]
      seq.push(col)
    }
    return seq
  }

  const [seq, setSeq] = React.useState<Seq>(getEmptySeq())

  const [kick, setKick] = React.useState<Sample>({url: 'kick', velocity: 100, length: 100})
  const [snare, setSnare] = React.useState<Sample>({url: 'snare', velocity: 100, length: 100})

  const sounds = [
    ["C4", "8n"],
    ["D4", "8n"],
    ["E4", "8n"],
    ["F4", "8n"],
  ]

  const placeSample = (col: number, row: number, sample: Sample) => {
      const newSeq: Seq = [...seq]
      newSeq[col][row] = sample
      setSeq(newSeq)
  }

  const removeSample = (col: number, row: number) => {
    const newSeq: Seq = [...seq]
    newSeq[col][row] = {url: '', velocity: 100, length: 100}
    setSeq(newSeq)
  }

  const playSample = (e: any, row: number) => {
    const sound = sounds[row]
    synth.triggerAttackRelease(sound[0], sound[1])
    console.log('playing sample ' + e.target.id)
  }

  const handleContextMenu = (e: any, rowIndex: number, colIndex: number) => {
    e.preventDefault()
    removeSample(colIndex, rowIndex)
  }
  
  const grid = seq.map((col, colIndex) => {
    const samples = col.map((sample, rowIndex) => {
      return (
        sample.url
          ? <div onClick={(e) => playSample(e, rowIndex)} onContextMenu={e => handleContextMenu(e, rowIndex, colIndex)} className='sample filled' id={sample.url}></div>
          : <div onClick={() => placeSample(colIndex, rowIndex, kick)} className='sample empty' id={sample.url}></div>
      )
    })
    return (
      <div className='grid'>
        {samples}
      </div>
    )
  })

  return (
    <div>
      {grid}
    </div>
  )
}

export default App;
