
export default class Interval {
    #min: number
    #max: number

    constructor(min: number, max: number) {
        this.#min = min;
        this.#max = max;
    }

    contains(num: number): boolean {
        return num >= this.#min && num <= this.#max;
    }

    surrounds(num: number): boolean {
        return num > this.#min && num < this.#max;
    }

    clamp(num: number): number {
        return Math.min(Math.max(num, this.#min), this.#max);
    }

    size() {
        this.#max - this.#min
    }

    get min(): number {
        return this.#min;
    }

    get max(): number {
        return this.#max;
    }
}