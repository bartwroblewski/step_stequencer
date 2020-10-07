import React from 'react'
import { JsxEmit, OperationCanceledException } from 'typescript'
import { NameInput, MileageInput, BikeInput } from './Inputs'
import { SubmitButton, CancelButton } from './Buttons'

type onSubmit = (e: any) => void
type onCancel = (e: any) => void

interface SubmitFormProps {
    onSubmit: onSubmit,
    onCancel: onCancel,
    inputs: JSX.Element[], 
}

const SubmitForm = ({onSubmit, onCancel, inputs}: SubmitFormProps) => {

    const handleSubmit = (e: any) => {
        console.log('submit')
        onSubmit(inputs)
    }

    const handleCancel = (e: any) => {
        console.log('cancel')
        onCancel(e)
    }

    return (
        <form onSubmit={handleSubmit}>
            {inputs}
            <SubmitButton />
            <CancelButton onClick={handleCancel} />
        </form> 
    )
}

interface AddGearFormProps {
    onSubmit: onSubmit,
    onCancel: onCancel,
    bikeNames: string[],
}
const AddGearForm = ({onSubmit, onCancel, bikeNames}: AddGearFormProps) => {
    return (
        <SubmitForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            inputs={[
                <NameInput />,
                <MileageInput />,
                <BikeInput bikeNames={bikeNames} />,
            ]}
        />
    )
}

export default AddGearForm