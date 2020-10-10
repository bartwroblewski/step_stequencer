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

    const [inputs, setInputs] = React.useState({
        name: '',
        mileage: 0,
        bikeName: '',
    })
    const [validationErrors, setValidationErrors] = React.useState({
        name: '',
        mileage: '',
        bikeName: '',
    })
    const [initial, setInitial] = React.useState<boolean>(true)
    const [valid, setValid] = React.useState<boolean>(false)

    const validate = () => {
        if (!initial) {
            // check if there are no error messages
            const errorMessages = Object.values(validationErrors)
            setValid(errorMessages.every(msg => msg === ''))
        }
    }

    React.useEffect(() => setInitial(false), [])

    React.useEffect(() => validate(), [validationErrors])

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        // validate input
        switch (name) {
            case 'name':
                const nameError = value ? '' : 'Name cannot be empty!'
                setValidationErrors(prev => ({...prev, ...{name: nameError}})) 
        }
        setInputs((prev: any) => ({...prev, ...{[name]: value}}))
    }
    
    const handleOnSubmit = (e: any) => {
        e.preventDefault()
        if (valid) {
            const { name, mileage, bikeName } = inputs
            onSubmit()(name, mileage, bikeName)
        } else {
            alert('Correct errors first!')
        }
    }

    return (
        <form onSubmit={(e: any) => handleOnSubmit(e)}>
            <div className="form-inputs">
                <NameInput 
                    value={inputs.name}
                    //onChange={(e: any) => handleNameChange(e.target.value)}
                    onChange={(e: any) => handleInputChange(e)}
                    className={validationErrors.name ? 'errored-input' : 'valid-input'}
                    placeholder={validationErrors.name || ''}
                />
                <MileageInput 
                    //onChange={(e: any) => handleMileageChange(e.target.value)}
                    onChange={(e: any) => handleInputChange(e)}
                    value={inputs.mileage}             
                />
                <BikeInput 
                    onChange={(e: any) => handleInputChange(e)}
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