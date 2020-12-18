import { Sequence, makeSequence } from './Sequence'

const sleep = async(ms: number) => new Promise(r => setTimeout(r, ms))

class Sequencer {
    sequences: Sequence[]
    constructor() {
        this.sequences = []
    }

    addSequence(sequence: Sequence) {
        this.sequences.push(sequence)
        return this.sequences
    }

    async startSequence(sequence: Sequence) {
        for(let i=0; i<sequence.length; i++) {
            const event = sequence[i]
            await event()
        }
    }

    startAllSequences() {
        for (let sequence of this.sequences) {
            this.startSequence(sequence)
        }
    }

    changeSequence(sequenceIndex: number, cellIndex: number) {
        const sequence = this.sequences[sequenceIndex]
        const newSequence = sequence.map((cell, index) => index === cellIndex ? () => alert('fgfg') : cell)
        return newSequence
    }
}

export default Sequencer