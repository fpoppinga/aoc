
import {promises as fs} from "fs"
import {execute} from './computer';

async function main() {
    const input = await fs.readFile("./2019/05/input.txt");

    const result = await(execute(input.toString("utf-8")));

    console.info("Result:", result);
}

main();
