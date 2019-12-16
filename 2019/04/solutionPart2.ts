
const from = 356_261;
const to = 846_303;

let count = 0;
for (let candidate = from; candidate <= to; candidate++) {
    const digits = (candidate.toString()).split("").map(c => parseInt(c));

    let doubleDigit = false;
    let increasing = true;
    for (let i = 0; i < 6; i++) {
        // increasing
        if (digits[i + 1] < digits[i]) {
            increasing = false;
            break;
        }

        // contains double digit, which is not a longer run:
        doubleDigit = doubleDigit || (digits[i - 1] === digits[i] && digits[i + 1] !== digits[i] && digits[i - 2] !== digits[i]) ;
    }

    if (increasing && doubleDigit) {
        count++;
    }
}

console.info("Count:", count);
