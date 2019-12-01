import {fuelForMass} from './solution';

describe("Day 1: The Tyranny of the Rocket Equation", () => {
    it("gives the correct example solutions", () => {
        expect(fuelForMass(12)).toBe(2);
        expect(fuelForMass(14)).toBe(2);
        expect(fuelForMass(1969)).toBe(654);
        expect(fuelForMass(100756)).toBe(33583);
    });
});
