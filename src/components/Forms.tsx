import React from 'react'
import { JsxEmit } from 'typescript'
import { NameInput, MileageInput, BikeInput } from './Inputs'
import { SubmitButton, CancelButton } from './Buttons'

type onSubmit = (e: any) => void

interface SubmitFormProps {
    onSubmit: onSubmit,
    inputs: JSX.Element[], 
}

const SubmitForm = ({onSubmit, inputs}: SubmitFormProps) => {

    const handleSubmit = () => {
        onSubmit(inputs)
    }

    return (
        <form onSubmit={handleSubmit}>
            {inputs}
            <SubmitButton />
            <CancelButton onClick={(e: any) => console.log('cancel')} />
        </form> 
    )
}

interface AddGearFormProps {
    onSubmit: onSubmit,
    bikeNames: string[],
}
const AddGearForm = ({onSubmit, bikeNames}: AddGearFormProps) => {
    return (
        <SubmitForm
            onSubmit={onSubmit}
            inputs={[
                <NameInput />,
                <MileageInput />,
                <BikeInput bikeNames={bikeNames} />,
            ]}
        />
    )
}

export default AddGearForm