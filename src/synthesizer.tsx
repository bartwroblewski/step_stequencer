import * as Tone from 'tone'

export type Sound = [string, string]

export const sounds: Array<Sound> = [
    ['C1', '16N'],
    ['D1', '16N'],
    ['E2', '16N'],
    ['F3', '16N'],
    ['G4', '16N'],
    ['A2', '16N'],
    ['G3', '16N'],
  ]

class Synthesizer {
    synthesizer: any
    constructor() {
        this.synthesizer = new Tone.Synth().toDestination()
        Tone.start()
    }
}

export default Synthesizer