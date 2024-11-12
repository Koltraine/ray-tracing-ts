"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = __importDefault(require("../utils.ts/color"));
const ray_1 = __importDefault(require("../utils.ts/ray"));
const utils_1 = require("../utils.ts/utils");
const abstract_material_1 = __importDefault(require("./abstract-material"));
class Dielectric extends abstract_material_1.default {
    constructor(refractionIndex) {
        super();
        this.refractionIndex = refractionIndex;
    }
    scatter(ray, hitRec) {
        const attenuation = color_1.default.create(1, 1, 1);
        const ri = hitRec.isFrontFace ? (1.0 / this.refractionIndex) : this.refractionIndex;
        const unitDir = ray.dir.normalize();
        const cos = Math.min(unitDir.scale(-1).dot(hitRec.normal), 1);
        const sin = Math.sqrt(1 - cos * cos);
        const notRefractable = ri * sin > 1;
        let dir;
        if (notRefractable || reflectance(cos, ri) > (0, utils_1.genRandomNumber)()) {
            dir = ray.dir.reflect(hitRec.normal);
        }
        else {
            dir = unitDir.refract(hitRec.normal, ri);
        }
        const scattered = new ray_1.default(hitRec.point, dir);
        return { scattered, attenuation };
    }
}
function reflectance(cos, ri) {
    // Use Schlick's approximation for reflectance.
    const r0Sqrd = (1 - ri) / (1 + ri);
    const r0 = r0Sqrd * r0Sqrd;
    return r0 + (1 - r0) * Math.pow(1 - cos, 5);
}
exports.default = Dielectric;
//# sourceMappingURL=dielectric.js.map