import React from 'react'
import './Grid.css'
import { SequenceStep, Sequence, Sequences } from '../sequencer'

const Grid = ({sequences, onCellClick}: {sequences: Sequences, onCellClick: any}) => { 
  return (
    <div>
      {sequences.map((sequence, sequenceIndex) => 
        <div className="grid-row">
          {sequence.map((step, stepIndex) =>
            <div 
              className={step ? "grid-cell filled" : "grid-cell"}
              onClick={() => onCellClick(sequenceIndex, stepIndex)}
            ></div>
          )}
        </div>
      )}
    </div>
  )
}
  export default Grid