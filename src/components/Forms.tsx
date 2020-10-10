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

    const [inputs, setInputs] = React.useState<any>({
        name: '',
        mileage: 0,
        bikeName: '',
    })

    const [validationErrors, setValidationErrors] = React.useState({
        name: '',
        mileage: '',
        bikeName: '',
    })

    const isValid = () => {
        // check if there are no error messages
        const errorMessages = Object.values(validationErrors)
        return errorMessages.every(msg => msg === '')
    }

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
    React.useEffect(() => {
        console.log(inputs)
        console.log('form valid: ', isValid())
    }, [inputs])

    const handleOnSubmit = (e: any) => {
        e.preventDefault()
        if (isValid()) {
            const { name, mileage, bikeName } = inputs
            onSubmit()(name, mileage, bikeName)
        } else {
            alert('Correct errors first!')
        }
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