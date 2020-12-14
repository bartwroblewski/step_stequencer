import Sequencer from './sequencer'
import { Step } from './sequencer'
import { GridType, GridRowType, GridCellType } from './components/Grid'
import { sounds, Sound } from './synthesizer'

const Controller = () => {
    const sequencer = Sequencer()

    const mapping: any = { // soundIndex vs rowIndex
        4: 0,
        6: 1,
        5: 2,
    }

    const getGridCellValue = (row: number, col: number): GridCellType => {
        return sequencer.steps[col].some((sound: Sound) => mapping[sounds.indexOf(sound)] === row)
        ? 1
        : 0
    }

    const makeGrid = () => {
        const n_cols = sequencer.steps.length
        const usedSounds = new Set(sequencer.steps.reduce((a: Step, b: Step) => a.concat(b)))
        const n_rows = usedSounds.size
        console.log(n_rows)
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
                const gridCell: GridCellType = getGridCellValue(row, col)
                gridRow.push(gridCell)
            }
            grid.push(gridRow)
        }
        return grid
    }

    return {
        sequencer: sequencer,
        makeGrid: makeGrid,
    }
}

export default Controller