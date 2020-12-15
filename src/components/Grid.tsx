import React from 'react'
import './Grid.css'
import { SequenceStep, Sequence, Sequences } from '../sequencer'

const Grid = ({sequences}: {sequences: Sequences}) => { 
  return (
    <div>
      {sequences.map(sequence => 
        <div className="grid-row">
          {sequence.map(step =>
            <div className={step ? "grid-cell filled" : "grid-cell"}></div>
          )}
        </div>
      )}
    </div>
  )
}
  export default Grid