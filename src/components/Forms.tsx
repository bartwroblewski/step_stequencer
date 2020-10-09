import React from 'react'
import { JsxEmit, OperationCanceledException } from 'typescript'
import { NameInput, MileageInput, BikeInput } from './Inputs'
import { SubmitButton, CancelButton } from './Buttons'

interface AddGearFormProps {
 onSubmit: any,
 onCancel: any,
 bikeNames: string[],
}

const AddGearForm = ({onSubmit, onCancel, bikeNames}: AddGearFormProps) => {

    const [name, setName] = React.useState<string>()
    const [mileage, setMileage] = React.useState<number>()
    const [bikeName, setBikeName] = React.useState<string>()

    const handleNameChange = (newName: string) => setName(newName)
    const handleMileageChange = (newMileage: number) => setMileage(newMileage)
    const handleBikeNameChange = (newBikeName: string) => setBikeName(newBikeName)

    const handleOnSubmit = (e: any) => {
        e.preventDefault()
        onSubmit(name, mileage, bikeName)
    }

    React.useEffect(() => {
        console.log(name, mileage, bikeName)
    }, [name, mileage, bikeName])

    return (
        <form onSubmit={(e: any) => handleOnSubmit(e)}>
            <div className="form-inputs">
                <NameInput onChange={(e: any) => handleNameChange(e.target.value)} />
                <MileageInput onChange={(e: any) => handleMileageChange(e.target.value)} />
                <BikeInput 
                    onChange={(e: any) => handleBikeNameChange(e.target.value)}
                    bikeNames={bikeNames}
                />

            </div>
            <div className="form-buttons">
                <SubmitButton />
                <CancelButton onClick={onCancel} />
            </div>

        </form>
    )
    }


export default AddGearForm