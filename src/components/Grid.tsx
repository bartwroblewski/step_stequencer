import React from 'react'
import { addSoundToStep } from '../sequencer'

const GridCell = ({row, col}: {row: number, col: number}) => {

    const handleClick = (e: any) => {
      console.log(row, col)
      addSoundToStep(col, 3)
    }
  
    return (
      <div 
        className='grid-cell'
        onClick={handleClick}
      ></div>
    )
  }
  
  const GridStep = ({col}: {col: number}) => 
    <div className="grid-step">
          <GridCell row={0} col={col} />
          <GridCell row={1} col={col} />
          <GridCell row={2} col={col} />
          <GridCell row={3} col={col} />
    </div>
  
  const Grid = () => { 
  
    const steps = []
    for (let i=0; i<16; i++) {
      steps.push(<GridStep key={i} col={i} />)
    }
    
    return (
      <div>
        {steps}
      </div>
    )
  }     

  export default Grid