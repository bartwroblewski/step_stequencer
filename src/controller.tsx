import Sequencer from './sequencer'
import { Step } from './sequencer'
import { GridType, GridRowType, GridCellType } from './components/Grid'
import { sounds, Sound } from './synthesizer'

const Controller = () => {
    const sequencer = Sequencer()

    const mapping: any = { // soundIndex vs rowIndex
        4: 0,
        6: 1,
    }

    const rowContainsSound = (row: number, sound: Sound) => mapping[sounds.indexOf(sound)] === row
    const stepContainsSound = (step: Step, row: number) => step.some((sound: Sound) => rowContainsSound(row, sound))

    const fillGridCell = (row: number, col: number): GridCellType => {
        const step = sequencer.steps[col]
        const cellFilled = stepContainsSound(step, row)
        return cellFilled ? 1 : 0
    }

    const makeGrid = () => {
        const n_cols = sequencer.steps.length
        const n_rows = Object.keys(sequencer.usedSounds).length
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
                const gridCell: GridCellType = fillGridCell(row, col)
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