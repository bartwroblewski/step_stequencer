import { Sequence, makeSequence } from './Sequence'

const sleep = async(ms: number) => new Promise(r => setTimeout(r, ms))

class Sequencer {
    sequences: Sequence[]
    constructor() {
        this.sequences = []
    }

    addSequence(sequence: Sequence): Sequence[] {
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

    changeSequence(sequenceIndex: number, cellIndex: number, event: Event): Sequence {
        const sequence = this.sequences[sequenceIndex]
       // const ev = sequence[cellIndex]
       // if (ev.name === event.name) 
        const newSequence = sequence.map((cell, index) => index === cellIndex ? event : cell)
        const newSequences = [...this.sequences]
        newSequences[sequenceIndex] = newSequence
        this.sequences = newSequences
        return newSequence
    }
}

export default Sequencer