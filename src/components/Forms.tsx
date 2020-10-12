import React from 'react'
import { JsxEmit, OperationCanceledException } from 'typescript'
import { NameInput, MileageInput, BikeInput } from './Inputs'
import { SubmitButton, CancelButton } from './Buttons'

interface AddGearFormProps {
 onSubmit: any,
 onCancel: any,
 bikeNames: string[],
}

const errorMessages = {
    name: 'Name cannot be empty!',
}

const AddGearForm = ({onSubmit, onCancel, bikeNames}: AddGearFormProps) => {

    const [inputs, setInputs] = React.useState<any>({
        name: '',
        mileage: 0,
        bikeName: '',
    })

    const [errors, setErrors] = React.useState({
        name: errorMessages.name,
    })

    const [showErrors, setShowErrors] = React.useState<boolean>(false)

    const validateInput = (name: string, value: string | number) => {
        let error: string
        switch (name) {
            case 'name':
                error = value ? '' : errorMessages.name  
                setShowErrors(true)
        }
        setErrors(prev => ({...prev, ...{[name]: error}}))
    }

    const validateInputs = () => {
        Object.keys(inputs).forEach(key => {
            validateInput(key, inputs[key])
        })
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setInputs((prev: any) => ({...prev, ...{[name]: value}})) 
        validateInput(name, value)
    }

    const noErrors = () => Object.values(errors).every(msg => !msg)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        validateInputs()
        if (noErrors()) {
            const { name, mileage, bikeName } = inputs
            onSubmit()(name, mileage, bikeName)
        } else {
            setShowErrors(true)
            alert('Correct errors first!')
        }
    }

    return (
        <form onSubmit={(e: any) => handleSubmit(e)}>
            <div className="form-inputs">
                <NameInput 
                    value={inputs.name}
                    onChange={(e: any) => handleInputChange(e)}
                    className={showErrors && errors.name ? 'errored-input' : 'valid-input'}
                    placeholder={showErrors ? errors.name : ''}
                />
                <MileageInput 
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