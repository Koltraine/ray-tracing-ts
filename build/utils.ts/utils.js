"use strict";
// import seedrandom from "seedrandom";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PI = void 0;
exports.degreesToRadians = degreesToRadians;
exports.genRandomNumber = genRandomNumber;
exports.genRandomNumberInRange = genRandomNumberInRange;
// Constants redefine PI for greater precision; Math.PI has fewer decimal places
const PI = 3.1415926535897932385;
exports.PI = PI;
//Pseudo generator for consistency between runs
// const rGen = seedrandom('secret-seed')
// Utility Functions
function degreesToRadians(degrees) {
    return degrees * (PI / 180);
}
function genRandomNumber() {
    return Math.random();
}
function genRandomNumberInRange(min, max) {
    // Returns a random real in [min,max).
    return min + (max - min) * Math.random();
}
//# sourceMappingURL=utils.js.map