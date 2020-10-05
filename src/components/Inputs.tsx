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
  
  const NameInput = () => <Input type="text" label="Name" />
  const MileageInput = () => <Input type="number" label="Mileage" />
  const BikeInput = () =>
    <MultiSelect 
      options={['romet', 'wigry', 'pinarello']} 
      initial_option="Assign bike(s)..."
    />

export { NameInput, MileageInput, BikeInput }