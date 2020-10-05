import React from 'react'

const Input = ({type, label}: {type: string, label?: string}) => {
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

const NameInput = () => <TextInput label="Name" />
const MileageInput = () => <NumberInput label="Mileage" />

const Inputs = () => {
    return (
        <div>
            <NameInput />
            <MileageInput />
        </div>
    )
}

const Test = () => {
    return (
        <div>
            Test inputs:
            <Inputs />
        </div>
    )
}

export default Test