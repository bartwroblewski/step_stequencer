import Sequencer from './sequencer'
import { Grid } from './components/Grid'

const Controller = () => {
    const sequencer = Sequencer()

    const makeGrid = () => {
        const n_cols = sequencer.steps
        const n_rows = Math.max(...sequencer.steps.map(step => step.length)) // n_rows = longest step length
        const grid: Grid = [
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        return grid
    }

    return {
        sequencer: sequencer,
        makeGrid: makeGrid
    }
}

export default Controller