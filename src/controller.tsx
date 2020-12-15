import Sequencer from './sequencer'
import { GridType, GridRowType, GridCellType } from './components/Grid'
import { sounds, Sound } from './synthesizer'

class Controller {
    sequencer: any
    indexes: any
    
    constructor() {
        this.sequencer = new Sequencer()
    }
}

export default Controller