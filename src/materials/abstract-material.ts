import { hitRecord } from "../objects/abstract-hittable";
import Color from "../utils.ts/color";
import Ray from "../utils.ts/ray";

interface ScatterResult {
    scattered: Ray
    attenuation: Color
}


abstract class Material {

    scatter(ray: Ray, hitRec: hitRecord): ScatterResult {
        throw new Error("Method not implemented.");
    }
}

export default Material