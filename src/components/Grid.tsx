import React from 'react'
import { addSoundToStep, Steps, Step, steps } from '../sequencer'

const GridCell = ({row, col, step}: {row: number, col: number, step: Step}) => {

    const className = row < step.length ? 'grid-cell filled' : 'grid-cell'

    const handleClick = (e: any) => {
      console.log(row, col)
      addSoundToStep(col, 3)
    }
  
    return (
      <div 
        className={className}
        onClick={handleClick}
      ></div>
    )
  }
  
  const GridStep = ({col, step}: {col: number, step: Step}) => {

    return (
        <div className="grid-step">
            <GridCell row={0} col={col} step={step} />
            <GridCell row={1} col={col} step={step}  />
            <GridCell row={2} col={col} step={step} />
            <GridCell row={3} col={col} step={step} />
        </div>
    )
  }
  const Grid = ({steps}: {steps: Steps}) => { 
    
    const grid = []
    for (let i=0; i<steps.length; i++) {
      grid.push(<GridStep key={i} col={i} step={steps[i]} />)
    }
    
    return (
      <div>
        {grid}
      </div>
    )
  }     

  export default Grid