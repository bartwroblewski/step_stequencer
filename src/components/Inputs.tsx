import React from 'react'
import MultiSelect from './MultiSelect'
import Test from './Test'
import '../css/Inputs.css'

type onChange = (e: any) => void

const NameInput = ({value, onChange, className, placeholder}: {value: string, onChange: onChange, className: string, placeholder: string}) => {
  return (
    <div>
      <label>Name: </label>
      <input
        value={value}
        placeholder={placeholder}
        type="text"
        onChange={onChange}
        className={className}
      ></input>
    </div>
  )
}

const MileageInput = ({onChange, value}: {onChange: onChange, value: number}) => {
  return (
    <div>
      <label>Mileage: </label>
      <input
        type="number"
        min="0"
        value={value}
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