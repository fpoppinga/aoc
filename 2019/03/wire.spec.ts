import {getIntersections, getMinManhattanDistance, getWire} from './wire';

describe("wire", () => {
    it("parses a wire", () => {
        const input = "R75,D30,R83,U83,L12,D49,R71,U7,L72".split(",");

        const wire = getWire(input);
        expect(wire[0].start).toEqual({x: 0, y: 0});
        expect(wire[0].direction).toBe("R");
        expect(wire[0].length).toBe(75);
        expect(wire[0].end).toEqual(wire[1].start);

        expect(wire).toHaveLength(9);
        expect(wire[8]).toHaveLength(72);
    });

    it("intersects", () => {
        const wireA = getWire("R8,U5,L5,D3".split(","));
        const wireB = getWire("U7,R6,D4,L4".split(","));

        const intersections = getIntersections(wireA, wireB);

        expect(intersections).toHaveLength(3);
        expect(getMinManhattanDistance(intersections)).toBe(6);
    });

    it("handles more complex test-cases", () => {
        const tests: [string, string, number][] = [
            ["R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83", 159],
            ["R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7", 135]
        ];

        tests.forEach(([wireA, wireB, expectedDist]) => {
            const intersections = getIntersections(getWire(wireA.split(",")), getWire(wireB.split(",")));
            expect(getMinManhattanDistance(intersections)).toBe(expectedDist);
        });
    });
});
