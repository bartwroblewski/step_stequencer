import React from 'react'
import MultiSelect from './MultiSelect'

interface InputProps {
    type: string,
    label?: string,
  }

const Input = ({type, label}: InputProps) => {
  return (
    <div>
      {label 
        ? `${label}: `
        : ''
      }
      <input type={type}></input>
    </div>
  )
}
  
const TextInput = ({label}: {label?: string}) => <Input type="text" label={label} />
const NumberInput = ({label}: {label?: string}) => <Input type="number" label={label} />

interface BikeInputProps {
  bikes: string[],
}

const NameInput = () => <TextInput label="Name" />
const MileageInput = () => <NumberInput label="Mileage"  />
const BikeInput = ({bikes}: BikeInputProps) =>
  <MultiSelect 
    options={bikes} 
    initial_option="Assign bike(s)..."
  />

export { NameInput, MileageInput, BikeInput }