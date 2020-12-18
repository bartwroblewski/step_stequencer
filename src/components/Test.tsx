const test = () => {
    type Sequence = number[]
    const sequences: Sequence[] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ]

    const getEmptySequence = (): Sequence => [0, 0, 0]

    interface UIHandlers {
        onAddSequence: () => Sequence[]
    }
    const UIHandlers = {
        onAddSequence: () => sequences.concat(getEmptySequence())
    }

    const SequencerUI = (handlers: UIHandlers) => {
        const addSequenceButton = {click: handlers.onAddSequence}

        return {addSequenceButton: addSequenceButton}
    }

    // simulate UI actions
    const UI = SequencerUI(UIHandlers)
    let newSequences
    newSequences = UI.addSequenceButton.click()
    newSequences = UI.addSequenceButton.click()
    newSequences = UI.addSequenceButton.click()
 
    console.log('sequences', newSequences)
}

export default test