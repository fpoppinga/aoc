import {promises as fs} from "fs"

export function fuelForMass(mass: number): number {
    return Math.max(Math.floor(mass / 3) - 2, 0);
}

async function main() {
    const input = await fs.readFile("./2019/01/input.txt");

    const result = input.toString("utf-8")
        .split("\n")
        .filter(it => it !== "")
        .map(it => parseInt(it))
        .map(it => fuelForMass(it))
        .reduce((a, b) => a + b, 0);

    console.info("Result: ", result);
}

main();
