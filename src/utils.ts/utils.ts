// import seedrandom from "seedrandom";

// Constants redefine PI for greater precision; Math.PI has fewer decimal places
const PI = 3.1415926535897932385;

//Pseudo generator for consistency between runs
// const rGen = seedrandom('secret-seed')
// Utility Functions

function degreesToRadians(degrees: number): number {
    return degrees * (PI / 180);
}

function genRandomNumber(): number {
    return Math.random();
}

function genRandomNumberInRange(min: number, max: number): number {
    // Returns a random real in [min,max).
    return min + (max - min) * Math.random();
}

export {
    PI,
    degreesToRadians,
    genRandomNumber,
    genRandomNumberInRange
}


