import Interval from "./interval";
import { genRandomNumber, genRandomNumberInRange } from "./utils";

class Color {
    #values: Float64Array

    private constructor(v1 = 0, v2 = 0, v3 = 0) {
        this.#values = new Float64Array([v1, v2, v3]);
    }

    static create(v1 = 0, v2 = 0, v3 = 0): Color {
        return new Color(v1, v2, v3);
    }

    static createFromArray(arr: Float64Array): Color {
        if (arr.length !== 3) {
            throw new Error("Array must have exactly three elements.");
        }
        return new Color(arr[0], arr[1], arr[2]);
    }

    static createRandom(min = 0, max = 1): Color {
        const r = genRandomNumberInRange(min, max)
        const g = genRandomNumberInRange(min, max)
        const b = genRandomNumberInRange(min, max)
        return new Color(r, g, b);
    }

    add(toSum: Color): Color {
        return new Color(
            this.#values[0] + toSum.#values[0],
            this.#values[1] + toSum.#values[1],
            this.#values[2] + toSum.#values[2]
        );
    }

    scale(scalar: number): Color {
        return new Color(
            this.#values[0] * scalar,
            this.#values[1] * scalar,
            this.#values[2] * scalar
        );
    }

    attenuate(attenuation: Color): Color {
        return new Color(
            this.#values[0] * attenuation.#values[0],
            this.#values[1] * attenuation.#values[1],
            this.#values[2] * attenuation.#values[2]
        );
    }

    print() {
        console.log(`[${this.toBase255().#values.join(', ')}]`);
    }

    private toBase255() {
        const intensity = new Interval(0, 0.999);
        return new Color(
            Math.floor(256 * intensity.clamp(this.#values[0])),
            Math.floor(256 * intensity.clamp(this.#values[1])),
            Math.floor(256 * intensity.clamp(this.#values[2]))
        );
    }

    toString() {
        return this.toGama().toBase255().#values.join(" ");
    }

    private toGama() {
        return new Color(
            (this.#values[0] <= 0) ? 0 : Math.sqrt(this.#values[0]),
            (this.#values[1] <= 0) ? 0 : Math.sqrt(this.#values[1]),
            (this.#values[2] <= 0) ? 0 : Math.sqrt(this.#values[2])
        );
    }

    // Getters
    get r() {
        return this.#values[0];
    }

    get g() {
        return this.#values[1];
    }

    get b() {
        return this.#values[2];
    }
}

export default Color