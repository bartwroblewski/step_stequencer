import Synthesizer from './synthesizer'
import { Sound, sounds } from './synthesizer'

export type Step = Array<Sound>
export type Steps = Array<Step>

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

class Sequencer {
    synthesizer: any
    BPM: number
    INTERVAL: number
    N_STEPS: number
    steps: Steps
    
    constructor() {
        this.synthesizer = new Synthesizer()
        this.BPM = 120
        this.INTERVAL = ((60 / this.BPM) / 4) * 1000 // 16th notes
        this.N_STEPS = 16
        this.steps = []
        //const DIVISION = 16 // 16th notes
        //const LOOP_LENGTH = INTERVAL * (DIVISION + 2) // why + 2?

        // create default steps
        for (let i=0;i<this.N_STEPS;i++) {
            let step: Step = []
            this.steps.push(step)
        }

        const kicks = [
            [0, 4],
            [4, 4],
            [8, 4],
            [12, 4],
        ]
        
        const snares = [
            [2, 6],
            [6, 6],
            [10,6],
            [14, 6],
        ]
        
        const hats = [
            [1, 5],
            [2, 5],
            [3, 5],
            [5, 5],
            [7, 5],
            [9, 5],
            [10, 5],
            [11, 5],
        ]
        
        kicks.forEach(kick => this.addSoundToStep(kick[0], kick[1]))
        snares.forEach(snare => this.addSoundToStep(snare[0], snare[1]))
        hats.forEach(hat => this.addSoundToStep(hat[0], hat[1]))
    }

    playSound(sound: Sound) {
        console.log('playing sound ', sound)
        this.synthesizer.synthesizer.triggerAttackRelease(sound[0], sound[1])
    }

    addSoundToStep(stepIndex: number, soundIndex: number) {
        this.steps[stepIndex].push(sounds[soundIndex])
    }

    playStep(step: Step) {
        console.log('playing step ', step)
        step.forEach(this.playSound.bind(this))
    }
    
    async playSteps() {
        for (let step of this.steps) {
          this.playStep(step)
          await sleep(this.INTERVAL)
        }
    }

}

export default Sequencer