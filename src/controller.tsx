import Sequencer from './sequencer'
import { GridType, GridRowType, GridCellType } from './components/Grid'

const Controller = () => {
    const sequencer = Sequencer()

    const makeGrid = () => {
        const n_cols = sequencer.steps.length
        const n_rows = Math.max(...sequencer.steps.map(step => step.length)) // n_rows = longest step length
      /*   const grid: Grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ] */
        const grid: GridType = []
        for (let row=0; row<n_rows; row++) {
            const gridRow: GridRowType = []
            grid.push(gridRow)
            const gridCell: GridCellType = 0
            for (let col=0; col<n_cols; col++) {
                gridRow.push(0)
            }
        }
        return grid
    }

    return {
        sequencer: sequencer,
        makeGrid: makeGrid,
    }
}

export default Controller