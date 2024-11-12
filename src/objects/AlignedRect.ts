import Material from "../materials/abstract-material";
import Interval from "../utils.ts/interval";
import Ray from "../utils.ts/ray";
import Vec3 from "../utils.ts/vec3";
import Hitable from "./abstract-hittable";

class AlignedRect extends Hitable {

    #vert1: Vec3
    #vert2: Vec3
    #material: Material

    constructor(vert1: Vec3, vert2: Vec3, mat: Material) {
        super();
        this.#vert1 = vert1;
        this.#vert2 = vert2;
        this.#material = mat
    }

    hit(ray: Ray, interval: Interval) {

        const t = -this.#vert1.z

        if (!interval.surrounds(t)) {
            return null;
        }


        const x = ray.at(t).x
        const y = ray.at(t).y

        const v1x = this.#vert1.x
        const v1y = this.#vert1.y
        const v2x = this.#vert2.x
        const v2y = this.#vert2.y

        if (v1x <= x && v2x >= x && v1y <= y && v2y >= y) {
            const point = Vec3.create(x, y, t)
            const normal = ray.dir

            return { t, point, normal, isFrontFace: true, material: this.#material }
        }
        return null
    }
}

export default AlignedRect