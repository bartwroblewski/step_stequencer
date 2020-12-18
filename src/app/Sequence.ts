import Event, { sleep } from './Event'

export type Sequence = Event[]

export const makeSequence = (sequenceLength: number, sleepMs: number): Sequence => {
    const sequence = []
    for (let i=0; i<sequenceLength; i++) {
        const sleepEvent: Event = () => sleep(sleepMs)
        sequence.push(sleepEvent)
    }
    return sequence
}

const changeSequence = (sequence: Sequence, cellIndex: number, event: Event): Sequence => {
    // Replace event at given index in sequence
    const newSequence = sequence.map((cell, index) => index === cellIndex ? event : cell)
    return newSequence
}

export const addSequence = (sequences: Sequence[]): Sequence[] => {
    const newSequence = makeSequence(16, 100)
    const newSequences = [...sequences]
    newSequences.push(newSequence)
    return newSequences
}
