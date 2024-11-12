import Hitable, { hitRecord } from "./objects/abstract-hittable";
import Interval from "./utils.ts/interval";
import Ray from "./utils.ts/ray";

export default class HitableList {

    #hittables: Hitable[] = []

    constructor() {

    }

    add(hitable: Hitable) {
        this.#hittables.push(hitable)
    }


    hit(ray: Ray, interval: Interval): hitRecord | null {

        const { min, max } = interval

        let closest = max
        let closestHR = null

        for (let obj of this.#hittables) {
            const hitRec = obj.hit(ray, new Interval(min, closest))
            if (hitRec !== null) {
                closest = hitRec.t
                closestHR = hitRec
            }
        }

        return closestHR
    }
}