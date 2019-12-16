import {promises as fs} from "fs"
import {getIntersections, getMinManhattanDistance, getWire} from './wire';

async function main() {
    const input = await fs.readFile("./2019/03/input.txt");

    const parsed = input.toString("utf-8")
        .split("\n")
        .map(it => it.split(","))
        .map(getWire);

    const [wireA, wireB] = parsed;

    console.info(getMinManhattanDistance(getIntersections(wireA, wireB)));
}

main();
