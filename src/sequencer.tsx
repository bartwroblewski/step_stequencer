import { Loop } from 'tone'
import Synthesizer from './synthesizer'
import { Sound, sounds } from './synthesizer'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export type SequenceStep = Sound | null
export type Sequence = Array<SequenceStep>
export type Sequences = Array<Sequence>

class Sequencer {
    synthesizer: any
    bpm: number
    stepDuration: number
    sequences: Array<Sequence>
    sequence_length: number
    n_sequences: number
    loopLength: number
    intervalId: any

    constructor() {
        this.synthesizer = new Synthesizer()
        this.bpm = 120
        this.stepDuration = ((60 / this.bpm) / 4) * 1000 // 16th notes

        this.sequence_length = 16
        this.n_sequences = 4
        this.sequences = [
            [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        ]
        this.intervalId = null

        //const DIVISION = 16 // 16th notes
        this.loopLength = this.stepDuration * (this.sequence_length + 2) // why + 2?
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
            await sleep(this.stepDuration)
        }
    }

    loop() {
        this.play()
        this.intervalId = setTimeout(this.loop.bind(this), this.loopLength)
    }

    stopLoop() {
        clearTimeout(this.intervalId)
    }

    placeSound(sequenceIndex: number, stepIndex: number) {
        this.sequences[sequenceIndex][stepIndex] = sounds[sequenceIndex]
    }

    addSequence() {
        this.sequences.push([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null])
    }
}

export default Sequencer