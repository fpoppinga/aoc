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

type Opcode = 1 | 2 | 99;

interface Instruction {
    readonly opcode: Opcode;
    readonly parameters: number[];
}

export function reverse(program: number[], target: number): [number, number] {
    // assume program is given in "normal form", i.e.
    // we are searching for verb and noun.

    for (let a = 0; a <= 99; a++) {
        for (let b = 0; b < 99; b++) {
            const instance = [...program];
            instance[1] = a;
            instance[2] = b;

            const result = compute(instance);

            if (result[0] === target) {
                return [a, b]
            }
        }
    }

    return [-1, -1];
}
