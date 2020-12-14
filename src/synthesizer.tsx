import * as Tone from 'tone'

export type Sound = [string, string]

const Synthesizer = () => {
    const synthesizer = new Tone.Synth().toDestination()
    Tone.start()
    return {synthesizer: synthesizer}
}


export default Synthesizer