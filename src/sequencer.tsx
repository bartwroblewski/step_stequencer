import { controller } from './index'
import Synthesizer from './synthesizer'
import { Sound, sounds } from './synthesizer'


const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export type SequenceStep = 0 | 1
export type Sequence = Array<SequenceStep>
export type Sequences = Array<Sequence>

type PickSound = (sequenceIndex: number) => Sound

class Sequencer {
    synthesizer: any
    bpm: number
    stepDuration: number
    sequences: Array<Sequence>
    sequence_length: number
    n_sequences: number
    loopLength: number
    intervalId: any
    pickSound: PickSound

    constructor(pickSound: PickSound) {
        this.pickSound = pickSound
        this.synthesizer = new Synthesizer()
        this.bpm = 120
        this.stepDuration = ((60 / this.bpm) / 4) * 1000 // 16th notes
        this.sequence_length = 16
        this.n_sequences = 4
        this.sequences = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        this.intervalId = 0
        //const DIVISION = 16 // 16th notes
        this.loopLength = this.stepDuration * (this.sequence_length + 2) // why + 2?
    }

    playSound(sound: Sound) {
        console.log('playing sound ', sound)
        this.synthesizer.synthesizer.triggerAttackRelease(sound[0], sound[1])
    }

    async play() {
        for (let step=0; step<this.sequence_length; step++) {
            this.sequences.forEach((sequence, sequenceIndex) => {
                if (sequence[step]) {
                    const sound = this.pickSound(sequenceIndex)
                    this.playSound(sound)
                }
            })
            await sleep(this.stepDuration)
        }
    }

    loop() {
        this.play()
        this.intervalId = setTimeout(() => this.loop(), this.loopLength)
    }

    stopLoop() {
        clearTimeout(this.intervalId)
    }

    placeSound(sequenceIndex: number, stepIndex: number) {
        this.sequences[sequenceIndex][stepIndex] = 1// sounds[soundIndex]
    }

    addSequence() {
        this.sequences.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    }
}

export default Sequencer