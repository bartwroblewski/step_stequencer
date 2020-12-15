import Sequencer from './sequencer'
import { Step } from './sequencer'
import { GridType, GridRowType, GridCellType } from './components/Grid'
import { sounds, Sound } from './synthesizer'

class Controller {
    sequencer: any
    usedSounds: Set<Sound>
    mapping: any
    
    constructor() {
        this.sequencer = new Sequencer()
        this.usedSounds = new Set(this.sequencer.steps.reduce((a: Step, b: Step) => a.concat(b)))
        this.mapping = {
            4: 0,
            6: 1,
            5: 2,
        }
    }

    getGridCellValue (row: number, col: number): GridCellType {
        return this.sequencer.steps[col].some((sound: Sound) => this.mapping[sounds.indexOf(sound)] === row)
        ? 1
        : 0
    }

    makeGrid(): GridType {
        const n_cols = this.sequencer.steps.length
        const n_rows = this.usedSounds.size
        console.log('used sounds', this.usedSounds.size)
      /*   const grid: Grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ] */
        const grid: GridType = []
        for (let row=0; row<n_rows; row++) {
            const gridRow: GridRowType = []        
            for (let col=0; col<n_cols; col++) {
                const gridCell: GridCellType = this.getGridCellValue(row, col)
                gridRow.push(gridCell)
            }
            grid.push(gridRow)
        }
        return grid
    }
}

export default Controller