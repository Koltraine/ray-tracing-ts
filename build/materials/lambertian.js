"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ray_1 = __importDefault(require("../utils.ts/ray"));
const vec3_1 = __importDefault(require("../utils.ts/vec3"));
const abstract_material_1 = __importDefault(require("./abstract-material"));
class Lambertian extends abstract_material_1.default {
    constructor(albedo) {
        super();
        this.albedo = albedo;
    }
    scatter(_, hitRec) {
        let scaterDir = hitRec.normal.add(vec3_1.default.createRandomUnit());
        if (vec3_1.default.isNearZero(scaterDir))
            scaterDir = hitRec.normal;
        const scattered = new ray_1.default(hitRec.point, scaterDir);
        const attenuation = this.albedo;
        return { scattered, attenuation };
    }
}
exports.default = Lambertian;
//# sourceMappingURL=lambertian.js.map