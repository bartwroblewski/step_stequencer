import React from 'react'
import { JsxEmit, OperationCanceledException } from 'typescript'
import { NameInput, BikeInput } from './Inputs'
import { SubmitButton, CancelButton } from './Buttons'

type onSubmit = (e: any) => void
type onCancel = (e: any) => void
type onChange = (e: any) => void

interface SubmitFormProps {
    onSubmit: any,
    onCancel: onCancel,
    inputs: JSX.Element[], 
}

const SubmitForm = ({onSubmit, onCancel, inputs}: SubmitFormProps) => {

    const handleSubmit = (e: any) => {
        e.preventDefault()
        onSubmit()
    }

    const handleCancel = (e: any) => {
        console.log('cancel')
        onCancel(e)
    }

    return (
        <form onSubmit={(e: any) => handleSubmit(e)}>
            {inputs}
            <SubmitButton />
            <CancelButton onClick={handleCancel} />
        </form> 
    )
}

interface AddGearFormProps {
    onSubmit: any,
    onCancel: onCancel,
    bikeNames: string[],
}
const AddGearForm = ({onSubmit, onCancel, bikeNames}: AddGearFormProps) => {

    const [name, setName] = React.useState<string>('Name')
    const [mileage, setMileage] = React.useState<number>(4343)
    const [bikeName, setBikeName] = React.useState<string>('bikeName')

    const handleNameChange = (newName: string) => setName(newName)
    const handleMileageChange = (newMileage: number) => setMileage(newMileage)
    const handleBikeNameChange = (newBikeName: string) => setBikeName(newBikeName)

    return (
        <SubmitForm
            onSubmit={() => onSubmit(name, mileage, bikeName)}
            onCancel={onCancel}
            inputs={[
                <NameInput onChange={(e: any) => handleNameChange(e.target.value)} />,
                //<MileageInput />,
                <BikeInput bikeNames={bikeNames} />,
            ]}
        />
    )
}

export default AddGearForm