import React from 'react'
import { setConstantValue } from 'typescript'

const Input = <T,>({type}: {type: string}) => {

    const [value, setValue] = React.useState<T>()

    const handleChange = (value: T) => {
        setValue(value)
    }

    React.useEffect(() => {
        console.log(value)
    }, [value])

    return (
        <input 
            type={type} 
            onChange={(e: any) => handleChange(e.target.value)}>
        </input>
    )
}

const TextInput = () => <Input<string> type="text"/>
const NumberInput = () => <Input<number> type="number"/>

const Test = () => {
    return (
        <div>
            <TextInput/>
            <NumberInput/>
        </div>
    )
}


export default Test