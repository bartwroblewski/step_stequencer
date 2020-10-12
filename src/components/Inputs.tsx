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
        name="name"
        value={value}
        placeholder={placeholder}
        type="text"
        onChange={onChange}
        className={className}
      ></input>
    </div>
  )
}

const MileageInput = ({value, onChange, className, placeholder}: {value: string, onChange: onChange, className: string, placeholder: string}) => {
  return (
    <div>
      <label>Mileage: </label>
      <input
        name="mileage"
        type="number"
        min="0"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
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