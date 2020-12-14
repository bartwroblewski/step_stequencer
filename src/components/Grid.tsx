import React from 'react'
import { Steps, Step } from '../sequencer'
import './Grid.css'

export type GridCellType = 0 | 1
export type GridRowType = GridCellType[]
export type GridType= GridRowType[]

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

  const Grid = ({grid}: {grid: GridType}) => { 
    return (
      <div className="grid">
        {grid.map(row => <GridRow row={row} />)}
      </div>
    )
  }     

  export default Grid