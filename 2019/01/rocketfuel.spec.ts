import {fuelForMass, fuelForMassIncludingFuel} from './rocketfuel';

describe("Day 1: The Tyranny of the Rocket Equation", () => {
    it("Step 1: gives the correct example solutions", () => {
        expect(fuelForMass(12)).toBe(2);
        expect(fuelForMass(14)).toBe(2);
        expect(fuelForMass(1969)).toBe(654);
        expect(fuelForMass(100756)).toBe(33583);
    });

    it("Step 2: considers the mass of the fuel (naive)", () => {
        expect(fuelForMassIncludingFuel(12)).toBe(2);
        expect(fuelForMassIncludingFuel(1969)).toBe(966);
        expect(fuelForMassIncludingFuel(100756)).toBe(50346);
    });
});
