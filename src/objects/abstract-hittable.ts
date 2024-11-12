import Material from "../materials/abstract-material";
import Interval from "../utils.ts/interval";
import Ray from "../utils.ts/ray";
import Vec3 from "../utils.ts/vec3";

export interface hitRecord {
    point: Vec3
    normal: Vec3
    t: number
    isFrontFace: boolean
    material: Material
}

abstract class Hitable {
    hit(ray: Ray, interval: Interval): hitRecord | null {
        throw new Error("Method not implemented.");
    }
}
export default Hitable

