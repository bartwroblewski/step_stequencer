import Sequencer from './sequencer'
import Synthesizer, { sounds, Sound } from './synthesizer'

class Controller {
    sequencer: any
    synthesizer: any
    soundMap: {[key: number]: number}
    
    constructor() {
        this.soundMap = {}
        this.synthesizer = new Synthesizer()
        this.sequencer = new Sequencer(
            this.pickSound.bind(this),
            this.playSound.bind(this),
        )
    }

    pickSound (sequenceIndex: number): Sound {
        const soundIndex = this.soundMap[sequenceIndex] || 0
        return sounds[soundIndex]
    }

    playSound(sound: Sound) {
        this.synthesizer.synthesizer.triggerAttackRelease(sound[0], sound[1])
    }
}

export default Controller