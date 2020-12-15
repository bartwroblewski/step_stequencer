import Synthesizer from './synthesizer'
import { Sound, sounds } from './synthesizer'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

type SequenceStep = Sound | null
type Sequence = Array<SequenceStep>

class Sequencer {
    synthesizer: any
    bpm: number
    interval: number
    sequences: Array<Sequence>
    sequence_length: number
    n_sequences: number

    constructor() {
        this.synthesizer = new Synthesizer()
        this.bpm = 120
        this.interval = ((60 / this.bpm) / 4) * 1000 // 16th notes

        this.sequence_length = 16
        this.n_sequences = 4
        this.sequences = this.getDefaultSequences()

        //const DIVISION = 16 // 16th notes
        //const LOOP_LENGTH = INTERVAL * (DIVISION + 2) // why + 2?
    }

    getDefaultSequences() {
        const sequences = []
        for (let i=0; i<this.n_sequences; i++) {
            const sequence: Sequence = this.getEmptySequence()
            sequences.push(sequence)
        }
        return sequences
    }

    getEmptySequence() {
        const sequence: Sequence = []
        for (let i=0; i<this.sequence_length; i++) {
            const step: SequenceStep = null
            sequence.push(step)
        }
        return sequence
    }

    playSound(sound: Sound) {
        console.log('playing sound ', sound)
        this.synthesizer.synthesizer.triggerAttackRelease(sound[0], sound[1])
    }
}

export default Sequencer