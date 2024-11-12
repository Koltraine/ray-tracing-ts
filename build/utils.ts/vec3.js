"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.values = new Float64Array([x, y, z]);
    }
    // Creators
    static create(x = 0, y = 0, z = 0) {
        return new Vec3(x, y, z);
    }
    static createFromArray(arr) {
        if (arr.length !== 3) {
            throw new Error("Array must have exactly three elements.");
        }
        return new Vec3(arr[0], arr[1], arr[2]);
    }
    static createRandom(min = 0, max = 1) {
        return new Vec3((0, utils_1.genRandomNumberInRange)(min, max), (0, utils_1.genRandomNumberInRange)(min, max), (0, utils_1.genRandomNumberInRange)(min, max));
    }
    static createRandomUnit() {
        while (true) {
            const p = Vec3.createRandom(-1, 1);
            const lensq = p.lengthSquared();
            if (1e-160 < lensq && lensq <= 1) {
                return p.divide(Math.sqrt(lensq));
            }
        }
    }
    static createRandomOnUnitDisk() {
        while (true) {
            const p = Vec3.create((0, utils_1.genRandomNumberInRange)(-1, 1), (0, utils_1.genRandomNumberInRange)(-1, 1), 0);
            if (p.lengthSquared() < 1) {
                return p;
            }
        }
    }
    static createRandomOnHemisphere(vec) {
        const p = Vec3.createRandomUnit();
        const dotProduct = p.dot(vec);
        if (dotProduct > 0) {
            return p;
        }
        return p.scale(-1);
    }
    static isNearZero(vec) {
        const s = 1e-8;
        return Math.abs(vec.values[0]) < s && Math.abs(vec.values[1]) < s && Math.abs(vec.values[2]) < s;
    }
    // Methods
    add(toSum) {
        return new Vec3(this.x + toSum.x, this.y + toSum.y, this.z + toSum.z);
    }
    subtract(toSub) {
        return new Vec3(this.x - toSub.x, this.y - toSub.y, this.z - toSub.z);
    }
    scale(scalar) {
        return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    divide(divisor) {
        if (divisor === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        return new Vec3(this.x / divisor, this.y / divisor, this.z / divisor);
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    lengthSquared() {
        return this.values[0] * this.values[0] + this.values[1] * this.values[1] + this.values[2] * this.values[2];
    }
    normalize() {
        const len = this.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return Vec3.create(this.x / len, this.y / len, this.z / len);
    }
    dot(toDot) {
        return this.values[0] * toDot.values[0] + this.values[1] * toDot.values[1] + this.values[2] * toDot.values[2];
    }
    cross(toCross) {
        const [x1, y1, z1] = this.values;
        const [x2, y2, z2] = toCross.values;
        return new Vec3(y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2);
    }
    reflect(n) {
        return this.subtract(n.scale(2 * this.dot(n)));
    }
    refract(n, etaiOverEtat) {
        const cosTheta = Math.min(this.dot(n.scale(-1)), 1.0);
        const rOutPerp = this.add(n.scale(cosTheta)).scale(etaiOverEtat);
        const rOutParallel = n.scale(-Math.sqrt(Math.abs(1.0 - rOutPerp.lengthSquared())));
        return rOutPerp.add(rOutParallel);
    }
    print() {
        console.log(`[${this.values.join(', ')}]`);
    }
    get x() {
        return this.values[0];
    }
    get y() {
        return this.values[1];
    }
    get z() {
        return this.values[2];
    }
}
exports.default = Vec3;
//# sourceMappingURL=vec3.js.map