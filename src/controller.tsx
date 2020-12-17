import Sequencer, { SoundManager } from './sequencer'
import Synthesizer, { sounds, Sound } from './synthesizer'

class Controller {
    sequencer: any
    synthesizer: any
    soundMap: {[key: number]: number}
    
    constructor() {
        this.soundMap = {}
        this.synthesizer = new Synthesizer()
        const soundManager: SoundManager = {
            pickSound: this.pickSound.bind(this),
            playSound: this.playSound.bind(this),
            playPart: this.playPart.bind(this),
        } 
        this.sequencer = new Sequencer(soundManager)
    }

    pickSound (sequenceIndex: number): Sound {
        const soundIndex = this.soundMap[sequenceIndex] || 0
        return sounds[soundIndex]
    }

    playSound(sound: Sound) {
        this.synthesizer.synthesizer.triggerAttackRelease(sound[0], sound[1])
    }

    playPart(part: Array<Sound>) {
        this.synthesizer.polySynthesizer.triggerAttackRelease(part, .1)
    }
}

export default Controller