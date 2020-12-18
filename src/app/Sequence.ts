import Event, { sleep } from './Event'

export type Sequence = Event[]

export const makeSequence = (sequenceLength: number): Sequence => {
    const sequence = []
    for (let i=0; i<sequenceLength; i++) {
        const sleepEvent: Event = () => sleep(500)
        sequence.push(sleepEvent)
    }
    return sequence
}