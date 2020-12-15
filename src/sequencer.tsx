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
        this.sequences = [
            [sounds[1], null, null, null, sounds[2], null, null, null, sounds[3], null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        ]

        //const DIVISION = 16 // 16th notes
        //const LOOP_LENGTH = INTERVAL * (DIVISION + 2) // why + 2?
    }

    playSound(sound: Sound) {
        console.log('playing sound ', sound)
        this.synthesizer.synthesizer.triggerAttackRelease(sound[0], sound[1])
    }


    async play() {
        for (let i=0; i<this.sequence_length; i++) {
            for (let sequence of this.sequences) {
                const sound = sequence[i]
                if (sound) {
                    this.playSound(sound)
                }
            }
            await sleep(this.interval)
        }
    

    }

}

export default Sequencer