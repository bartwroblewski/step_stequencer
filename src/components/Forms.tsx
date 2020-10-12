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

    const [errors, setErrors] = React.useState({
        name: '',
    })

    const [initial, setInitial] = React.useState<boolean>(true)
    const [valid, setValid] = React.useState<boolean>(false)

    const validateInput = (name: string, value: string | number) => {
        let error: string
        switch (name) {
            case 'name':
                error = value ? '' : 'Name cannot be empty!'  
        }
        setErrors(prev => ({...prev, ...{[name]: error}}))
    }

    const validateInputs = () => {
        Object.keys(inputs).forEach(key => {
            validateInput(key, inputs[key])
        })
    }

    const handleInputChange = (e: any) => {
        if (initial) setInitial(!initial)
        
        const { name, value } = e.target
        setInputs((prev: any) => ({...prev, ...{[name]: value}})) 
        validateInput(name, value)
    }

    const ifErrors = () => Object.values(errors).every(msg => !msg)

    React.useEffect(() => setValid(ifErrors()), [errors])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        validateInputs()
        if (valid && !initial) {
            const { name, mileage, bikeName } = inputs
            onSubmit()(name, mileage, bikeName)
        } else {
            alert('Correct errors first!')
        }
    }

    return (
        <form onSubmit={(e: any) => handleSubmit(e)}>
            <div className="form-inputs">
                <NameInput 
                    value={inputs.name}
                    onChange={(e: any) => handleInputChange(e)}
                    className={errors.name ? 'errored-input' : 'valid-input'}
                    placeholder={errors.name || ''}
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