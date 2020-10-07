import React from 'react'
import MultiSelect from './MultiSelect'
import Test from './Test'

interface InputProps {
    type: string,
    label?: string,
    onChange: (e: any) => void
  }

const Input = <T,>({type, label, onChange}: InputProps) => {
  
  return (
    <div>
      {label 
        ? `${label}: `
        : ''
      }
      <input 
        type={type}
        onChange={onChange}>
      </input>
    </div>
  )
}
  
const TextInput = ({label, onChange}: {label?: string, onChange: (e: any) => void}) => {
  return (
    <Input<string> 
      type="text"
      label={label} 
      onChange={onChange}
    />
  )
  }
//const NumberInput = ({label}: {label?: string}) => <Input<number> type="number" label={label} />

interface BikeInputProps {
  bikeNames: string[],
}

const NameInput = ({onChange} : {onChange: (e: any) => void}) => {
  return (
   <TextInput onChange={onChange} label="Name" />
  )
}
//const MileageInput = () => <NumberInput label="Mileage"  />
const BikeInput = ({bikeNames}: BikeInputProps) =>
  <MultiSelect 
    options={bikeNames} 
    placeholder_text="Assign bike(s)..."
  />

export { NameInput, BikeInput }