import React from 'react'
import * as Tone from 'tone'
import './App.css'

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

interface GridComponentProps {
  grid: Grid,
  setGrid: any,
}

const GridComponent = ({grid, setGrid}: GridComponentProps) => {

  const toggleCell = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid]
    const cell = newGrid[rowIndex][colIndex]
    newGrid[rowIndex][colIndex] = cell === 0 ? 1 : 0
    setGrid(newGrid)
  }

  const style = {
    display: 'flex',
    justifyContent: 'space-around'
  }
  const gridEl = grid.map((row: Row, rowIndex: number) => {
    return (
      <div style={style}>
        {row.map((cell: Cell, colIndex: number) => <div onClick={() => toggleCell(rowIndex, colIndex)}>{cell}</div>)}
      </div>
    )
  })

  return (
    <div>
      {gridEl}
    </div>
  )
}

type Sound = [string, string]
type RowsSounds = { [row: number]: number }

const App = () => {

  const COLS = 16

  const [grid, setGrid] = React.useState<Grid>([])
 
  const [rowsSounds, setRowsSounds] = React.useState<RowsSounds>({
    // row index vs sound index
    0: 0,
    1: 0,
    2: 0,
    3: 6,
  })

  //React.useEffect(() => console.log(grid), [grid])
  //React.useEffect(() => console.log(rowsSounds), [rowsSounds])

  const sounds: Array<Sound> = [
    ['C1', '16N'],
    ['D1', '16N'],
    ['E2', '16N'],
    ['F3', '16N'],
    ['G4', '16N'],
    ['A2', '16N'],
    ['G3', '16N'],
  ]

  const attachSoundToRow = (rowIndex: number, soundIndex: number) => {
    setRowsSounds(prev => {
      return {...prev, ...{[rowIndex]: soundIndex}}
    })
  }

  const getSoundForRow = (rowIndex: number): Sound => {
    const soundIndex = rowsSounds[rowIndex]
    const sound = sounds[soundIndex]
    return sound
  }

  const playSound = (sound: Sound) => {
    synth.triggerAttackRelease(sound[0], sound[1])
}

  const playGridOnce = async() => {
    const rows = grid.length
    for (let col=0; col<COLS; col++) {
      await sleep(INTERVAL)
      for (let row=0; row<rows; row++) {
        const cell = grid[row][col]
        if (cell === 1) {
          const sound = getSoundForRow(row)
          console.log('playing', row, col, sound)
          playSound(sound) 
        } 
      }      
    }
  }

  const loop = async() => {
    while (true) {
      playGridOnce()
      await sleep(LOOP_LENGTH)
    }
  }
    
  const getEmptyRow = (): Row => {
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

  const soundSelectors = 
    <div className="sound-selectors-container">
      {grid.map((row: Row, rowIndex: number) => {
        const options = sounds.map((sound: Sound, soundIndex: number) => <option value={soundIndex}>{sound[0]}</option>)
        return (
          <select onChange={e => {
              attachSoundToRow(rowIndex, parseInt(e.target.value))}}>
            {options}
          </select>
        )
      })}
    </div>


  return (
    <div>
      {grid.length}
      <button onClick={addEmptyRow}>Add row</button>
      <button onClick={playGridOnce}>Play grid once</button>
      <button onClick={loop}>Play in loop</button>
      <GridComponent grid={grid} setGrid={setGrid} />
      {soundSelectors}
      <div>{Object.values(rowsSounds)}</div>
    </div>
  )
}

export default App
