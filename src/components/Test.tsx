import { errorMonitor } from 'events'
import React from 'react'
import { setConstantValue } from 'typescript'

const errorTexts = {
    name: 'Name cannot be empty!',
    mileage: 'Mileage cannot be less than 1!',
    bikeName: 'Seems like a bike name error!',
}

interface ErrorContent {
    text: string,
    visible: boolean,
}

const Form = () => {

    const handleSubmit = (e: any) => {
        console.log('Valid: ', valid())    
        if (!valid()) {
            e.preventDefault()
            showAllErrors()  
        }
    }

    const showError = (errorContent: ErrorContent) => ({...errorContent, ...{visible: true}})

    const showAllErrors = () => {
        setErrors((prev: any) => {
            let old_state = Object.assign(prev, {})
            let new_state: any = {}
            Object.keys(old_state).forEach(key => {
                let value = old_state[key]
                new_state[key] = showError(value)
            })
            return new_state
        })
    }


    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        let error_text = ''
        switch (name) {
            case 'name':
                error_text = value ? '' : errorTexts.name
                break
            case 'mileage':
                error_text = value < 1 ? errorTexts.mileage : ''             
                break
            case 'bikeName':
                error_text = value ? '' : errorTexts.bikeName
                break
        }

        const error = {text: error_text, visible: true}

        setErrors((prev: any) => 
            ({...prev, ...{[name]: error}})
        )
        setInputs(prev => 
            ({...prev, ...{[name]: value}})
        )
    }

    const [inputs, setInputs] = React.useState({
        name: '',
        mileage: 0,
        bikeName: '', 
    })

    const [errors, setErrors] = React.useState<any>({
        name: {text: errorTexts.name, visible: false},
        mileage: {text: errorTexts.mileage, visible: false},
        bikeName: {text: errorTexts.bikeName, visible: false},

    })

    const valid = () => Object.keys(errors).every(key => !errors[key].text)

    React.useEffect(() => console.log('Errors: ', errors), [errors])

    return (
        <form onSubmit={(e: any) => handleSubmit(e)}>
            <label>Name: </label>
            <input
                value={inputs.name}
                onChange={(e: any) => handleInputChange(e)}
                name="name"
                type="text"
                placeholder={errors.name.visible ? errors.name.text : ''}>
            </input>
            <label>Mileage: </label>
            <input 
                value={inputs.mileage}
                onChange={(e: any) => handleInputChange(e)}
                name="mileage"
                type="number"
                placeholder={errors.mileage.visible ? errors.mileage.text : ''}>
            </input>
            <label>Bike name: </label>
            <input 
                value={inputs.bikeName}
                onChange={(e: any) => handleInputChange(e)}
                name="bikeName"
                type="text"
                placeholder={errors.bikeName.visible ? errors.bikeName.text : ''}>
            </input>
            <button type="submit">Submit</button>
        </form>
    )  
}

const Test = () => {
    return (
        <div>
            <Form/>
        </div>
    )
}


export default Test