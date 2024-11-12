import Material from "../materials/abstract-material";
import Interval from "../utils.ts/interval";
import Ray from "../utils.ts/ray";
import Vec3 from "../utils.ts/vec3";
import Hitable from "./abstract-hittable";

class Sphere extends Hitable {

    #center: Vec3
    #radius: number
    #material: Material

    constructor(center: Vec3, radius: number, mat: Material) {
        super();
        this.#center = center;
        this.#radius = Math.max(radius, 0);
        this.#material = mat
    }

    hit(ray: Ray, interval: Interval) {
        const oc = this.#center.subtract(ray.origin)

        const a = ray.dir.lengthSquared()
        const h = ray.dir.dot(oc)
        const c = oc.lengthSquared() - this.#radius * this.#radius
        const discriminant = h * h - a * c

        if (discriminant < 0) {
            return null
        }

        const sqrtDiscriminant = Math.sqrt(discriminant)

        let t = (h - sqrtDiscriminant) / a

        if (!interval.surrounds(t)) {
            t = (h + sqrtDiscriminant) / a
            if (!interval.surrounds(t)) {
                return null
            }
        }


        const point = ray.at(t)

        const outwardNormal = point.subtract(this.#center).divide(this.#radius)

        const isFrontFace = ray.dir.dot(outwardNormal) < 0

        const normal = isFrontFace ? outwardNormal : outwardNormal.scale(-1)

        return { t, point, normal, isFrontFace, material: this.#material }
    }
}

export default Sphere