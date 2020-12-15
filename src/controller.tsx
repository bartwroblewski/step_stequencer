import Sequencer from './sequencer'
import { Step } from './sequencer'
import { GridType, GridRowType, GridCellType } from './components/Grid'
import { sounds, Sound } from './synthesizer'

class Controller {
    sequencer: any
    indexes: any
    
    constructor() {
        this.sequencer = new Sequencer()
        this.indexes = {
       /*      4: 0,
            6: 1,
            5: 2, */
        }
        for (let i=0; i<sounds.length; i++) {
            this.indexes[i] = i
        }
    }

    getUsedSounds(): Set<Sound> {
        const usedSounds: Set<Sound> = new Set(this.sequencer.steps.reduce((a: Step, b: Step) => a.concat(b)))
        return usedSounds
    }

    getGridCellValue (row: number, col: number): GridCellType {
        return this.sequencer.steps[col].some((sound: Sound) => this.indexes[sounds.indexOf(sound)] === row)
        ? 1
        : 0
    }

    addRow() {
        const n_rows = this.getUsedSounds().size
        this.sequencer.addSoundToStep(0, n_rows + 1)
        alert(n_rows)
    }

    makeGrid(): GridType {
        const n_cols = this.sequencer.steps.length
        const usedSounds = this.getUsedSounds()
        console.log(usedSounds)
        const n_rows = usedSounds.size
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