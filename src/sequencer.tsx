import { Sound } from './synthesizer'

export type SequenceStep = 0 | 1
export type Sequence = Array<SequenceStep>
export type Sequences = Array<Sequence>
type PickSound = (sequenceIndex: number) => Sound
type PlaySound = (sound: Sound) => void

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

interface SequencerConstructor {}

class Sequencer {
    bpm: number
    stepDuration: number
    sequences: Array<Sequence>
    sequence_length: number
    n_sequences: number
    loopLength: number
    intervalId: any
    pickSound: PickSound
    playSound: PlaySound

    constructor(pickSound: PickSound, playSound: PlaySound) {
        this.pickSound = pickSound
        this.playSound = playSound
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
        this.loopLength = this.stepDuration * (this.sequence_length + 2) // why + 2?
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

    toggleStep(sequenceIndex: number, stepIndex: number) {
        const step = this.sequences[sequenceIndex][stepIndex]
        this.sequences[sequenceIndex][stepIndex] = step ? 0 : 1
    }

    addSequence() {
        this.sequences.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    }
}

export default Sequencer