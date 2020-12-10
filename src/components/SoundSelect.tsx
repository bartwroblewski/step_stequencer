import React from 'react'

export type Sound = {pitch: string, length: string}

interface SoundSelectProps {
    sounds: Sound[],
    setSounds: any,
}

export const SoundSelect = ({sounds, setSounds}: SoundSelectProps) => {
    
    const options = sounds.map((sound, index) => <option key={index}>{sound.pitch}</option>)

    const handleChange = (e: any) => {
        const sound = {pitch: e.target.value, length: sounds[0].length}
        const newSounds = [...sounds]
        newSounds[0] = sound
        console.log(newSounds)
        setSounds(newSounds)
    }

    return (
        <select onChange={handleChange}>
            {options}
        </select>
    )
}