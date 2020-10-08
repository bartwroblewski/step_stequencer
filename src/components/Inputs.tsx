import React from 'react'
import MultiSelect from './MultiSelect'
import Test from './Test'

interface InputProps {
    type: string,
    label?: string,
    onChange: any,
    name: string,
  }

interface InputState {
  input_name: string,
  input_value: string | number,
}

const Input = <T,>({type, label, onChange, name}: InputProps) => {

  const [state, setState] = React.useState<InputState>()

  const handleOnChange = (e: any) => {
    setState({
      input_name: name,
      input_value: e.target.value,
    })
  }

  React.useEffect(() => {
    onChange(state)
  }, [state])

  return (
    <div>
      {label 
        ? `${label}: `
        : ''
      }
      <input 
        type={type}
        name={name}
        onChange={(e: any) => handleOnChange(e)}>
      </input>
    </div>
  )
}
  
const TextInput = ({label, onChange, name}: {label?: string, onChange: any, name: string}) => {
  return (
    <Input<string> 
      type="text"
      name={name}
      label={label} 
      onChange={onChange}
    />
  )
  }
const NumberInput = ({label, onChange, name}: {label?: string, onChange: any, name: string}) => {
  return (
    <Input<number>
      type="number"
      name={name}
      label={label}
      onChange={onChange}
    />
  )
}

interface BikeInputProps {
  bikeNames: string[],
}

const NameInput = ({onChange} : any) => {
  return (
   <TextInput onChange={onChange} name="name" label="Name" />
  )
}
const MileageInput = ({onChange} : any) => {
  return (
   <NumberInput onChange={onChange} name="mileage" label="Mileage" />
  )
}
const BikeInput = ({bikeNames}: BikeInputProps) =>
  <MultiSelect 
    options={bikeNames} 
    placeholder_text="Assign bike(s)..."
  />

export { NameInput, MileageInput, BikeInput }