"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ray_1 = __importDefault(require("../utils.ts/ray"));
const abstract_material_1 = __importDefault(require("./abstract-material"));
const vec3_1 = __importDefault(require("../utils.ts/vec3"));
class Metal extends abstract_material_1.default {
    constructor(albedo, fuzz) {
        super();
        this.fuzz = null;
        this.albedo = albedo;
        if (fuzz) {
            this.fuzz = fuzz;
        }
    }
    scatter(ray, hitRec) {
        let reflected = ray.dir.reflect(hitRec.normal);
        if (this.fuzz) {
            reflected = reflected.normalize().add(vec3_1.default.createRandomUnit().scale(this.fuzz));
        }
        const scattered = new ray_1.default(hitRec.point, reflected);
        const attenuation = this.albedo;
        return { scattered, attenuation };
    }
}
exports.default = Metal;
//# sourceMappingURL=metal.js.map