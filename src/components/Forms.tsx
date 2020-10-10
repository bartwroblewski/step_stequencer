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

    const [name, setName] = React.useState<string>('')
    const [mileage, setMileage] = React.useState<number>(0)
    const [bikeName, setBikeName] = React.useState<string>()

    const [inputs, setInputs] = React.useState<any>({})
    const handleInputChange = (e: any) => {
        const { name, value } = e.target

        switch (name) {
            case 'name':
                const nameError = value ? '' : 'Name cannot be empty!'
                setValidationErrors(prev => ({...prev, ...{name: nameError}}))       
                setName(value)
        }
        setInputs((prev: any) => ({...prev, ...{[name]: value}}))
    }
    React.useEffect(() => console.log(inputs), [inputs])

    const [validationErrors, setValidationErrors] = React.useState({
        name: '',
        mileage: '',
        bikeName: '',
    })

    const handleNameChange = (newName: string) => {
        // name validation
        const nameError = newName ? '' : 'Name cannot be empty!'
        setValidationErrors(prev => ({...prev, ...{name: nameError}}))       
        setName(newName)
    }

    const handleMileageChange = (newMileage: number) => setMileage(newMileage)
    const handleBikeNameChange = (newBikeName: string) => setBikeName(newBikeName)

    const handleOnSubmit = (e: any) => {
        e.preventDefault()
        onSubmit()(name, mileage, bikeName)
    }

    React.useEffect(() => {
        if (validationErrors.name) {
                //alert(validationErrors.name)
        }
    }, [validationErrors])


    return (
        <form onSubmit={(e: any) => handleOnSubmit(e)}>
            <div className="form-inputs">
                <NameInput 
                    value={name}
                    //onChange={(e: any) => handleNameChange(e.target.value)}
                    onChange={(e: any) => handleInputChange(e)}
                    className={validationErrors.name ? 'errored-input' : 'valid-input'}
                    placeholder={validationErrors.name || ''}
                />
                <MileageInput 
                    //onChange={(e: any) => handleMileageChange(e.target.value)}
                    onChange={(e: any) => handleInputChange(e)}
                    value={mileage}             
                />
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