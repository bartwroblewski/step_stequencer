import * as Tone from 'tone'

const synth = new Tone.Synth().toDestination()

export type Sound = [string, string]
export const defaultSound = {name: 'C', pitch: 4}
export const defaultNoteLength: string = '16N'
export const soundNames: string[] = [
    'C', 'C#',
    'D', 'D#',
    'E',
    'F', 'F#',
    'G', 'G#',
    'B',
]
export const playSound = (sound: Sound) => synth.triggerAttackRelease(sound[0], sound[1])
export const playDefaultSound = () => playSound([defaultSound.name + defaultSound.pitch, defaultNoteLength])
