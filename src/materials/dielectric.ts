import { hitRecord } from "../objects/abstract-hittable";
import Color from "../utils.ts/color";
import Ray from "../utils.ts/ray";
import { genRandomNumber } from "../utils.ts/utils";
import Vec3 from "../utils.ts/vec3";
import Material from "./abstract-material";

class Dielectric extends Material {

    private refractionIndex: number

    constructor(refractionIndex: number) {
        super()
        this.refractionIndex = refractionIndex
    }

    scatter(ray: Ray, hitRec: hitRecord) {
        const attenuation = Color.create(1, 1, 1)
        const ri = hitRec.isFrontFace ? (1.0 / this.refractionIndex) : this.refractionIndex


        const unitDir = ray.dir.normalize()

        const cos = Math.min(unitDir.scale(-1).dot(hitRec.normal), 1)
        const sin = Math.sqrt(1 - cos * cos)
        const notRefractable = ri * sin > 1

        let dir: Vec3

        if (notRefractable || reflectance(cos, ri) > genRandomNumber()) {
            dir = ray.dir.reflect(hitRec.normal)
        } else {
            dir = unitDir.refract(hitRec.normal, ri)
        }

        const scattered = new Ray(hitRec.point, dir)

        return { scattered, attenuation }
    }
}

function reflectance(cos: number, ri: number): number {
    // Use Schlick's approximation for reflectance.
    const r0Sqrd = (1 - ri) / (1 + ri);
    const r0 = r0Sqrd * r0Sqrd;
    return r0 + (1 - r0) * Math.pow(1 - cos, 5)
}

export default Dielectric