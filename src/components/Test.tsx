interface Action {
    type: string,
}

const arr = [1, 2, 3, 4]

const reducer = (state: number[], action: Action): any => {
    switch (action.type) {
        case 'ADD':
            return state.concat(state[state.length -1] + 1)
    }
}

let newArr = reducer(arr, {type: 'ADD'})
newArr = reducer(newArr, {type: 'ADD'})
newArr = reducer(newArr, {type: 'ADD'})
newArr = reducer(newArr, {type: 'ADD'})
console.log(newArr)

export {}