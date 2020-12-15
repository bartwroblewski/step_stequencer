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

  const Grid = ({grid, onCellClick}: {grid: GridType, onCellClick: any}) => { 
    return (
      <div className="grid">
        {grid.map(row => 
          <div className="grid-row">
            {row.map((cell, stepIndex) => 
              <div className={cell ? 'grid-cell filled' : 'grid-cell'} onClick={() => onCellClick(stepIndex)}></div>
            )}
          </div>
        )}
      </div>
    )
  }     

  export default Grid