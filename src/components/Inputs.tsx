import React from 'react'
import MultiSelect from './MultiSelect'
import Test from './Test'

interface InputProps {
    type: string,
    label?: string,
    onChange: any,
  }

interface InputState {
  input_name: string,
  input_value: string | number,
}

const Input = <T,>({type, label, onChange}: InputProps) => {

  const [state, setState] = React.useState<InputState>()

  const handleOnChange = (e: any) => {
    setState({
      input_name: 'placeholder',
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
        onChange={(e: any) => handleOnChange(e)}>
      </input>
    </div>
  )
}
  
const TextInput = ({label, onChange}: {label?: string, onChange: any}) => {
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

const NameInput = ({onChange} : any) => {
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