import Sequence from './Sequence'

const sleep = async(ms: number) => new Promise(r => setTimeout(r, ms))

class Sequencer {
    sequences: Sequence[]
    constructor() {
        this.sequences = []
    }

    addSequence(sequence: Sequence) {
        this.sequences.push(sequence)
    }

    async startSequence(sequence: Sequence) {
        for(let i=0; i<sequence.n_ticks; i++) {
            sequence.event()
            await sleep(sequence.tickDuration)
        }
    }

    startAllSequences() {
        for (let sequence of this.sequences) {
            this.startSequence(sequence)
        }
    }
}

export default Sequencer