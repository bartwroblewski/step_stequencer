import React from 'react'
import './Grid.css'

export type GridCellType = 0 | 1
export type GridRowType = GridCellType[]
export type GridType= GridRowType[]

  const Grid = ({grid}: {grid: GridType}) => { 
    return (
      <div className="grid">
        {grid.map((row, rowIndex) => 
          <div className="grid-row">
            {row.map((cell, stepIndex) => 
              <div className={cell ? 'grid-cell filled' : 'grid-cell'} onClick={() => {}}></div>
            )}
          </div>
        )}
      </div>
    )
  }     

  export default Grid