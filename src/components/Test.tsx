import React from 'react'
import { setConstantValue } from 'typescript'

const Form = () => {

    const [inputs, setInputs] = React.useState<any>({})

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setInputs((prev: any) => ({...prev, ...{[name]: value}}))     
    }

    React.useEffect(() => console.log(inputs), [inputs])

    return (
        <form>
            <input type="text" name="name" onChange={(e: any) => handleInputChange(e)}></input>
            <input type="number" name="mileage" onChange={(e: any) => handleInputChange(e)}></input>
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