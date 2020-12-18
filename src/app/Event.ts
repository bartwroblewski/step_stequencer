type Event = any

export const sleep: Event = async(ms: number) => new Promise(r => setTimeout(r, ms))

export default Event

