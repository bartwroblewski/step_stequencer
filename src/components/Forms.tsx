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

    const [inputValues, setInputValues] = React.useState<any>() // any dictionary

    const handleSubmit = (e: any) => {
        e.preventDefault()
        onSubmit()
    }

    const handleCancel = (e: any) => {
        console.log('cancel')
        onCancel(e)
    }

    const handleInputChange = (inputState: {input_name: string, input_value: string | number}) => {
        setInputValues(inputState)
    }

    const inputsWithChangeHandler = inputs.map(input => {
        return React.cloneElement(input, {onChange: handleInputChange})
    })

    React.useEffect(() => {
        console.log(inputValues)
    }, [inputValues])

    return (
        <form onSubmit={(e: any) => handleSubmit(e)}>
            {inputsWithChangeHandler}
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

interface AddGearFormInputsStates {
    name: string,
    mileage: number,
    bikeName: string,
}

const AddGearForm = ({onSubmit, onCancel, bikeNames}: AddGearFormProps) => {

    const [name, setName] = React.useState<string>('Name')
    const [mileage, setMileage] = React.useState<number>(4343)
    const [bikeName, setBikeName] = React.useState<string>('bikeName')

    const [inputsValues, setInputsValues] = React.useState<AddGearFormInputsStates>(
        {
            name: '',
            mileage: 0,
            bikeName: 'no name',
        }
    )

    const handleInputChange = (inputState: {input_name: string, input_value: string | number}) => {
        console.log(inputState, inputsValues)
        setInputsValues(prev => {
            return {...prev, ...inputState}
        })
    }


    return (
        <SubmitForm
            onSubmit={() => onSubmit(name, mileage, bikeName)}
            onCancel={onCancel}
            inputs={[
                <NameInput onChange={handleInputChange} />,
                //<MileageInput />,
                <BikeInput bikeNames={bikeNames} />,
            ]}
        />
    )
}

export default AddGearForm