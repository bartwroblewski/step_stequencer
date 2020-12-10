import React from 'react'
import * as Tone from 'tone'
import './App.css'
import { Sound, SoundSelect } from './components/SoundSelect'

const synth = new Tone.Synth().toDestination()

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const BPM = 120
const INTERVAL = ((60 / BPM) / 4) * 1000 // 16th notes
const DIVISION = 16 // 16th notes
const LOOP_LENGTH = INTERVAL * (DIVISION + 2) // why + 2?

type Cell = 0 | 1
type Row = Array<Cell>
type Grid = Array<Row>

const App = () => {

  const COLS = 16

  const [grid, setGrid] = React.useState<Grid>([])

  const getEmptyRow = () => {
    let row: Row = []
    for (let i=0; i<COLS; i++) {
      const cell: Cell = 0
      row.push(cell)
    }
    return row
  }

  const addRow = () => {
    const emptyRow = getEmptyRow()
    setGrid([...grid, emptyRow])
  }

  const enableCell = (row: number, col: number) => {
    const newGrid = [...grid]
    newGrid[row][col] = 1
    setGrid(newGrid)
  }

  const disableCell = (row: number, col: number) => {
    const newGrid = [...grid]
    newGrid[row][col] = 0
    setGrid(newGrid)
  }

  const playSound = (sound: Sound) => {
      synth.triggerAttackRelease(sound.pitch, sound.length)
  }

  const playGridOnce = () => {
    const rows = grid.length
    for (let col=0; col<COLS; col++) {
      for (let row=0; row<rows; row++) {
        const cell = grid[row][col]
        if (cell) {
          console.log('playing', row, col)
        }
      }      
    } 
  }

  React.useEffect(() => console.log(grid), [grid])

  return (
    <div>
      {grid.length}
      <button onClick={addRow}>Add row</button>
      <button onClick={() => enableCell(1, 5)}>Enable cell 1, 5</button>
      <button onClick={() => disableCell(1, 5)}>Disable cell 1, 5</button>
      <button onClick={playGridOnce}>Play grid once</button>
    </div>
  )
}

export default App
