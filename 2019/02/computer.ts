export function compute(program: number[]): number[] {
    let pointer = 0;
    const memory = [...program];

    while (true) {
        const operation = memory[pointer];

        if (operation === 99) {
            return memory;
        }

        const val1 = memory[memory[pointer + 1]];
        const val2 = memory[memory[pointer + 2]];
        const resPtr = memory[pointer + 3];

        let result = 0;
        switch (operation) {
            case 1: result = val1 + val2; break;
            case 2: result = val1 * val2; break;
            default: throw new Error(`Illegal Operation: ${operation}: ${JSON.stringify(memory)}`);
        }

        memory[resPtr] = result;
        pointer += 4;
    }
}
