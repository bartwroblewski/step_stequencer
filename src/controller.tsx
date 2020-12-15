import Sequencer from './sequencer'

class Controller {
    sequencer: any
    indexes: any
    
    constructor() {
        this.sequencer = new Sequencer()
    }
}

export default Controller