
export function fuelForMass(mass: number): number {
    return Math.max(Math.floor(mass / 3) - 2, 0);
}

export function fuelForMassIncludingFuel(mass: number): number {
    let totalFuel = 0;

    let fuel = fuelForMass(mass);
    while(fuel > 0) {
        totalFuel += fuel;
        fuel = fuelForMass(fuel);
    }

    return totalFuel;
}
