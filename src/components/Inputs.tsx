import React from 'react'
import MultiSelect from './MultiSelect'
import Test from './Test'

interface InputProps {
    type: string,
    label?: string,
  }

const Input = <T,>({type, label}: InputProps) => {

  const [value, setValue] = React.useState<T>()

  const handleChange = (new_value: T) => {
    console.log(new_value)
    setValue(new_value)
  }

  return (
    <div>
      {label 
        ? `${label}: `
        : ''
      }
      <input 
        type={type}
        onChange={(e: any) => handleChange(e.target.value)}>
      </input>
    </div>
  )
}
  
const TextInput = ({label}: {label?: string}) => <Input<string> type="text" label={label} />
const NumberInput = ({label}: {label?: string}) => <Input<number> type="number" label={label} />

interface BikeInputProps {
  bikeNames: string[],
}

const NameInput = () => <TextInput label="Name" />
const MileageInput = () => <NumberInput label="Mileage"  />
const BikeInput = ({bikeNames}: BikeInputProps) =>
  <MultiSelect 
    options={bikeNames} 
    placeholder_text="Assign bike(s)..."
  />

export { NameInput, MileageInput, BikeInput }