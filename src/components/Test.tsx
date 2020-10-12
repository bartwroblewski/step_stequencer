import React from 'react'
import { setConstantValue } from 'typescript'

const Form = () => {

    const [inputs, setInputs] = React.useState<any>({
        name: '',
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
            console.log(key, inputs[key])
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
        //validateInput('name', errors.name)
        validateInputs()
        if (valid && !initial) {
            alert('Submitted')
        } else {
            alert('Correct errors first!')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="name"
                onChange={(e: any) => handleInputChange(e)}
                placeholder={errors.name ? errors.name : ''}
            ></input>
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