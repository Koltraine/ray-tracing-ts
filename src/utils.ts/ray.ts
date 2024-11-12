import Vec3 from "./vec3";


class Ray {

    #origin: Vec3
    #dir: Vec3

    constructor(orig: Vec3, dir: Vec3) {
        this.#origin = orig
        this.#dir = dir
    }

    at(t: number): Vec3 {
        return this.#origin.add(this.#dir.scale(t))
    }

    get origin(): Vec3 {
        return this.#origin;
    }

    get dir(): Vec3 {
        return this.#dir;
    }
}

export default Ray 