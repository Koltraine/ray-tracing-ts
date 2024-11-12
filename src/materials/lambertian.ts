import { hitRecord } from "../objects/abstract-hittable";
import Ray from "../utils.ts/ray";
import Vec3 from "../utils.ts/vec3";
import Color from "../utils.ts/color";
import Material from "./abstract-material";

class Lambertian extends Material {
    private albedo: Color;

    constructor(albedo: Color) {
        super()
        this.albedo = albedo
    }

    scatter(_: Ray, hitRec: hitRecord) {
        let scaterDir = hitRec.normal.add(Vec3.createRandomUnit())

        if (Vec3.isNearZero(scaterDir))
            scaterDir = hitRec.normal

        const scattered = new Ray(hitRec.point, scaterDir);

        const attenuation = this.albedo

        return { scattered, attenuation }
    }

}

export default Lambertian;
