import Sequencer from './sequencer'
import { sounds, Sound } from './synthesizer'

class Controller {
    sequencer: any
    soundMap: {[key: number]: number}
    
    constructor() {
        this.soundMap = {}
        this.sequencer = new Sequencer(this.pickSound)
    }

    pickSound = (sequenceIndex: number): Sound => {
        const soundIndex = this.soundMap[sequenceIndex] || 0
        return sounds[soundIndex]
    }
}

export default Controller