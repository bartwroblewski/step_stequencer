import Event from './Event'

interface ISequenceOptions {
    n_ticks: number,
    tickDuration: number,
    event: Event,
}

class Sequence {
    n_ticks: number
    tickDuration: number
    event: Event
    constructor(options: ISequenceOptions) {
        this.n_ticks = options.n_ticks
        this.tickDuration = options.tickDuration
        this.event = options.event
    }
}

export default Sequence