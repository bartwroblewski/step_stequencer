import React from 'react'
import MultiSelect from './MultiSelect'
import Test from './Test'

type onChange = (e: any) => void

const NameInput = ({onChange}: {onChange: onChange}) => {
  return (
    <div>
      <label>Name: </label>
      <input
        type="text"
        onChange={onChange}
      ></input>
    </div>
  )
}

const MileageInput = ({onChange}: {onChange: onChange}) => {
  return (
    <div>
      <label>Mileage: </label>
      <input
        type="number"
        onChange={onChange}
      ></input>
    </div>
  )
}

interface BikeInputProps {
  onChange: onChange,
  bikeNames: string[],
}

const BikeInput = ({onChange, bikeNames} : BikeInputProps) => {
  return (
    <MultiSelect
      onChange={onChange}
      options={bikeNames}
      placeholder_text='Choose...'
      label="Bike"
    />
  )
}
      
export { NameInput, MileageInput, BikeInput } 