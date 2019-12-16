
import {promises as fs} from "fs"
import { compute } from './computer';
import * as path from 'path';

async function main() {
    const input = await fs.readFile("./2019/02/input.txt");

    const program = input.toString("utf-8")
        .split(",")
        .map(it => parseInt(it));

    program[1] = 12;
    program[2] = 2;
    const result = compute(program);

    console.info("Result: ", result);
    console.info("First: ", result[0]);
}

main();
