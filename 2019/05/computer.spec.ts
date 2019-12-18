import {execute} from './computer';

describe("advanced computer", () => {
    it("is backwards compatible", async () => {
        const tests: [string, number[]][] = [
            [[1,0,0,0,99].join(","), [2,0,0,0,99]],
            [[2,3,0,3,99].join(","), [2,3,0,6,99]],
            [[2,4,4,5,99,0].join(","), [2,4,4,5,99,9801]],
            [[1,1,1,4,99,5,6,0,99].join(","), [30,1,1,4,2,5,6,0,99]]
        ];

        for (const [program, result] of tests) {
            expect(await execute(program)).toEqual(result);
        }
    });

    xit("interactively runs complex programs", async () => {
        const result = await execute("3,9,8,9,10,9,4,9,99,-1,8");
    })
});
