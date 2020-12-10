import React from 'react'
import * as Tone from 'tone'
import './App.css'
import { Sound, SoundSelect } from './components/SoundSelect'

const synth = new Tone.Synth().toDestination()

Tone.start()

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const BPM = 120
const INTERVAL = ((60 / BPM) / 4) * 1000 // 16th notes
const DIVISION = 16 // 16th notes
const LOOP_LENGTH = INTERVAL * (DIVISION + 2) // why + 2?

type Cell = 0 | 1
type Row = Array<Cell>
type Grid = Array<Row>

const Grid = () => {

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

  const addEmptyRow = () => {
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

  const playSound = (sound: any) => {
      synth.triggerAttackRelease(sound[0], sound[1])
  }

  const sounds = [
    ['C1', '16N'],
    ['D1', '16N'],
    ['E2', '16N'],
    ['F3', '16N'],
    ['G4', '16N'],
    ['A2', '16N'],
    ['G3', '16N'],
  ]

  const rowsVsSounds: { [row: number]: number } = {
    // row index vs sound index
    1: 2,
    2: 5,
    3: 1,
    4: 6,
  }

  const pickSound = (row: number) => {
    const soundIndex = rowsVsSounds[row]
    const sound = sounds[soundIndex]
    return sound
  }

  const playGridOnce = () => {
    const rows = grid.length
    for (let col=0; col<COLS; col++) {
      for (let row=0; row<rows; row++) {
        const cell = grid[row][col]
        if (cell) {
          const sound = pickSound(row)
          console.log('playing', row, col)
          playSound(sound)
        }
      }      
    } 
  }

  React.useEffect(() => console.log(grid), [grid])



  return (
    <div>
      {grid.length}
      <button onClick={addEmptyRow}>Add row</button>
      <button onClick={() => enableCell(1, 5)}>Enable cell 1, 5</button>
      <button onClick={() => disableCell(1, 5)}>Disable cell 1, 5</button>
      <button onClick={playGridOnce}>Play grid once</button>
    </div>
  )
}

const App = () => {

  return (
    <div>
      <Grid />
    </div>
  )
}

export default App
