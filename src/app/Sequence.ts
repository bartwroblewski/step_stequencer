import Event, { sleep } from './Event'

export type Sequence = Event[]

export const makeSequence = (sequenceLength: number, sleepMs: number): Sequence => {
    const sequence = []
    for (let i=0; i<sequenceLength; i++) {
        //const sleepEvent: Event = () => sleep(sleepMs)
        sequence.push(null)
    }
    return sequence
}
