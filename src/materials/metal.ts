import { hitRecord } from "../objects/abstract-hittable";
import Ray from "../utils.ts/ray";
import Color from "../utils.ts/color";
import Material from "./abstract-material";
import Vec3 from "../utils.ts/vec3";

class Metal extends Material {
    private albedo: Color;
    private fuzz: number | null = null

    constructor(albedo: Color, fuzz?: number) {
        super();
        this.albedo = albedo;
        if (fuzz) {
            this.fuzz = fuzz
        }
    }

    scatter(ray: Ray, hitRec: hitRecord) {
        let reflected = ray.dir.reflect(hitRec.normal)
        if (this.fuzz) {
            reflected = reflected.normalize().add(Vec3.createRandomUnit().scale(this.fuzz))
        }
        const scattered = new Ray(hitRec.point, reflected);
        const attenuation = this.albedo

        return { scattered, attenuation }
    }
}

export default Metal;
