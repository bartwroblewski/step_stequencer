import React from 'react'
import { sounds } from '../synthesizer'

interface SoundSelectProps {
    id: number,
    onChange: any,
}

const SoundSelect = ({id, onChange}: SoundSelectProps) => {

    const options = sounds.map((sound, index) => <option value={index}>{sound[0]}</option>)
    return (
        <select>
            {options}
        </select>
    )
}

export default SoundSelect