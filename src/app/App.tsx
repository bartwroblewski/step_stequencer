import Sequencer from './Sequencer'

const Backend = () => {
    const sequencer = new Sequencer()
    return {
        sequencer: sequencer,
    }
}

export default Backend