interface TestOptions {
    a: string,
    b: number,
}

class Test {
    options: TestOptions
    constructor (options: TestOptions) {
        this.options = options
    }
}

const test = new Test({a: 'sdsf', b: 4545})


export {}

