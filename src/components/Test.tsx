interface Action {
    type: string,
}

interface GUIHandlers {
    onAdd: () => number[]
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
        arr: arr,
        handleAdd: add,
    }
}

const app = App()

// GUI
const GUIHandlers = {onAdd: app.handleAdd} 
const AppGUI = (handlers: GUIHandlers): any => {
    return {add: handlers.onAdd}
}
const gui = AppGUI(GUIHandlers)

// simulate GUI action
let newArr = gui.add()
newArr = gui.add()
newArr = gui.add()
console.log(newArr)

export {}