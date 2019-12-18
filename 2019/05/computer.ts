enum Opcode {
    ADD = 1,
    MUL = 2,
    INP = 3,
    OUT = 4,
    JNZ = 5,
    JZ = 6,
    LT = 7,
    EQ = 8,
    HCF = 99
}

enum ParameterMode {
    POSITION = 0,
    IMMEDIATE = 1
}

interface Parameter {
    readonly mode: ParameterMode;
    readonly value: number;
}

interface Instruction {
    readonly opcode: Opcode;
    readonly parameters: Parameter[];
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function getInput(): Promise<number> {
    return new Promise(resolve => {
        readline.question("Input: ", (answer: string) => resolve(parseInt(answer)));
    })
}

function resolve(memory: number[], parameter: Parameter): number {
    if (parameter.mode === ParameterMode.IMMEDIATE) {
        return parameter.value;
    }

    return memory[parameter.value];
}

export async function execute(program: string): Promise<number[]> {
    const memory = program.split(",").map(it => parseInt(it));

    let instructionPtr = 0;
    while(true) {
        const rawInstruction = memory[instructionPtr++];

        const opcode = (rawInstruction % 100);
        const parameterModes = [
            Math.floor(rawInstruction / 100) % 10,
            Math.floor(rawInstruction / 1000) % 10,
            Math.floor(rawInstruction / 10000) % 10,
        ];

        const parameters: Parameter[] = [];
        switch (opcode) {
            case Opcode.HCF:
                break;
            case Opcode.ADD:
            case Opcode.MUL:
            case Opcode.LT:
            case Opcode.EQ:
                parameters.push({
                    mode: parameterModes[0],
                    value: memory[instructionPtr++],
                });
                parameters.push({
                    mode: parameterModes[1],
                    value: memory[instructionPtr++],
                });
                parameters.push({
                    mode: parameterModes[2],
                    value: memory[instructionPtr++],
                });
            break;
            case Opcode.JNZ:
            case Opcode.JZ:
                parameters.push({
                    mode: parameterModes[0],
                    value: memory[instructionPtr++],
                });
                parameters.push({
                    mode: parameterModes[1],
                    value: memory[instructionPtr++],
                });
                break;
            case Opcode.INP:
            case Opcode.OUT:
                parameters.push({
                    mode: parameterModes[0],
                    value: memory[instructionPtr++],
                });
                break;
        }

        switch (opcode) {
            case Opcode.HCF:
                return memory;
            case Opcode.ADD: {
                const val1 = resolve(memory, parameters[0]);
                const val2 = resolve(memory, parameters[1]);
                const destination = parameters[2].value;

                memory[destination] = val1 + val2;
                break;
            }
            case Opcode.MUL: {
                const val1 = resolve(memory, parameters[0]);
                const val2 = resolve(memory, parameters[1]);
                const destination = parameters[2].value;

                memory[destination] = val1 * val2;
                break;
            }
            case Opcode.INP: {
                const val = await getInput();
                const destination = parameters[0].value;
                memory[destination] = val;
                break;
            }
            case Opcode.OUT: {
                const val = resolve(memory, parameters[0]);
                console.info("Out:", val);
                break;
            }
            case Opcode.JNZ: {
                const val = resolve(memory, parameters[0]);
                if (val !== 0) {
                    instructionPtr = resolve(memory, parameters[1]);
                }
                break;
            }
            case Opcode.JZ: {
                const val = resolve(memory, parameters[0]);
                if (val === 0) {
                    instructionPtr = resolve(memory, parameters[1]);
                }
                break;
            }
            case Opcode.LT: {
                const val1 = resolve(memory, parameters[0]);
                const val2 = resolve(memory, parameters[1]);
                const destination = parameters[2].value;

                memory[destination] = val1 < val2 ? 1 : 0;
                break;
            }
            case Opcode.EQ:{
                const val1 = resolve(memory, parameters[0]);
                const val2 = resolve(memory, parameters[1]);
                const destination = parameters[2].value;

                memory[destination] = val1 === val2 ? 1 : 0;
                break;
            }
        }
    }
}

