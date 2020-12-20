import React from 'react'

interface Action {
    type: string,
}

const App = () => {

    let arr = [1, 2, 3, 4]

    const reducer = (state: number[], action: Action): any => {
        switch (action.type) {
            case 'ADD':
                return state.concat(state[state.length -1] + 1)
        }
    }

    const add = (): number[] => arr = reducer(arr, {type: 'ADD'})

    return {
        arr: () => arr,
        handleAdd: add,
    }
}

const app = App()

// GUI
interface UIHandlers {
    onAdd: any,
}
interface UIProps {
    handlers: UIHandlers,
}

export const UIHandlers: UIHandlers = {onAdd: app.handleAdd} 
const AppUI = (handlers: UIHandlers): any => {
    return {add: handlers.onAdd}
}
const gui = AppUI(UIHandlers)

// simulate GUI action
gui.add()
gui.add()
gui.add()
console.log(app.arr())

const Test: React.FC<UIProps> = ({handlers}: UIProps) => {

    const handleClick = () => {
        const arr = handlers.onAdd()
        console.log('arr', arr)
    }
    return (
        <div>
            <button onClick={handleClick}>Add</button>
        </div>
    )
}

export default Test