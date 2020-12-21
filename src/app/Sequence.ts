import Event from './Event'

export type Sequence = Event[]

export const makeSequence = (sequenceLength: number, sleepMs: number): Sequence => {
    const sequence = []
    for (let i=0; i<sequenceLength; i++) {
        sequence.push(null)
    }
    return sequence
}

export const makeSequences = (nSequences: number, sequenceLength: number, sleepMs: number) => {
    const sequences: Sequence[] = []
    for (let i=0; i<nSequences; i++){
        const sequence = makeSequence(sequenceLength, sleepMs)
        sequences.push(sequence)
    }
    return sequences
}
