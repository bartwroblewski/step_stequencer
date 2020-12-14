import React from 'react'
import { Steps, Step } from '../sequencer'
import './Grid.css'

type GridCellType = 0 | 1
type GridRowType = GridCellType[]
export type Grid= GridRowType[]

  const GridCell = ({cell}: {cell: GridCellType}) => {

    const className = cell ? 'grid-cell filled' : 'grid-cell'

    return <div className={className}></div>
  }

  const GridRow = ({row}: {row: GridRowType}) => {
    return (
      <div className="grid-row">
        {row.map(cell => <GridCell cell={cell} />)}
      </div>
    )
  }

  const Grid = ({grid}: {grid: Grid}) => { 
    
    return (
      <div className="grid">
        {grid.map(row => <GridRow row={row} />)}
      </div>
    )
  }     

  export default Grid