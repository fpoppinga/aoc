
import {promises as fs} from "fs"
import {compute, reverse} from './computer';

async function main() {
    const input = await fs.readFile("./2019/02/input.txt");

    const parsed = input.toString("utf-8")
        .split(",")
        .map(it => parseInt(it));

    const program = [...parsed];
    program[1] = 12;
    program[2] = 2;
    const result = compute(program);

    console.info("Result: ", result);
    console.info("First: ", result[0]);

    const [noun, verb] = reverse([...parsed], 19690720);
    console.info("noun: ", noun, "verb: ", verb);

    // Double-Check:
    const doubleCheck = [...parsed];
    doubleCheck[1] = noun;
    doubleCheck[2] = verb;
    const result2 = compute(doubleCheck);
    console.info("Result: ", result2[0]);
}

main();
