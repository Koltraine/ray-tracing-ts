import { genRandomNumberInRange } from "./utils";

class Vec3 {
    private values: Float64Array

    private constructor(x = 0, y = 0, z = 0) {
        this.values = new Float64Array([x, y, z])
    }

    // Creators
    static create(x = 0, y = 0, z = 0): Vec3 {
        return new Vec3(x, y, z);
    }

    static createFromArray(arr: number[]): Vec3 {
        if (arr.length !== 3) {
            throw new Error("Array must have exactly three elements.");
        }
        return new Vec3(arr[0], arr[1], arr[2]);
    }

    static createRandom(min = 0, max = 1): Vec3 {
        return new Vec3(genRandomNumberInRange(min, max), genRandomNumberInRange(min, max), genRandomNumberInRange(min, max));
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

    static createRandomOnUnitDisk(): Vec3 {
        while (true) {
            const p = Vec3.create(genRandomNumberInRange(-1, 1), genRandomNumberInRange(-1, 1), 0);
            if (p.lengthSquared() < 1) {
                return p;
            }
        }
    }

    static createRandomOnHemisphere(vec: Vec3) {
        const p = Vec3.createRandomUnit()
        const dotProduct = p.dot(vec)
        if (dotProduct > 0) {
            return p
        }
        return p.scale(-1)
    }

    static isNearZero(vec: Vec3): boolean {
        const s = 1e-8;
        return Math.abs(vec.values[0]) < s && Math.abs(vec.values[1]) < s && Math.abs(vec.values[2]) < s;
    }


    // Methods
    add(toSum: Vec3): Vec3 {
        return new Vec3(
            this.x + toSum.x,
            this.y + toSum.y,
            this.z + toSum.z
        );
    }

    subtract(toSub: Vec3): Vec3 {
        return new Vec3(
            this.x - toSub.x,
            this.y - toSub.y,
            this.z - toSub.z
        );
    }

    scale(scalar: number): Vec3 {
        return new Vec3(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar
        );
    }

    divide(divisor: number): Vec3 {
        if (divisor === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        return new Vec3(
            this.x / divisor,
            this.y / divisor,
            this.z / divisor
        );
    }

    length(): number {
        return Math.sqrt(this.lengthSquared())
    }

    lengthSquared(): number {
        return this.values[0] * this.values[0] + this.values[1] * this.values[1] + this.values[2] * this.values[2];
    }

    normalize(): Vec3 {
        const len = this.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return Vec3.create(this.x / len, this.y / len, this.z / len);
    }

    dot(toDot: Vec3): number {
        return this.values[0] * toDot.values[0] + this.values[1] * toDot.values[1] + this.values[2] * toDot.values[2];
    }

    cross(toCross: Vec3): Vec3 {
        const [x1, y1, z1] = this.values;
        const [x2, y2, z2] = toCross.values;
        return new Vec3(
            y1 * z2 - z1 * y2,
            z1 * x2 - x1 * z2,
            x1 * y2 - y1 * x2
        );
    }

    reflect(n: Vec3): Vec3 {
        return this.subtract(n.scale(2 * this.dot(n)))
    }

    refract(n: Vec3, etaiOverEtat: number): Vec3 {
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

export default Vec3