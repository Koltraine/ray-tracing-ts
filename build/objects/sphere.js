"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Sphere_center, _Sphere_radius, _Sphere_material;
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_hittable_1 = __importDefault(require("./abstract-hittable"));
class Sphere extends abstract_hittable_1.default {
    constructor(center, radius, mat) {
        super();
        _Sphere_center.set(this, void 0);
        _Sphere_radius.set(this, void 0);
        _Sphere_material.set(this, void 0);
        __classPrivateFieldSet(this, _Sphere_center, center, "f");
        __classPrivateFieldSet(this, _Sphere_radius, Math.max(radius, 0), "f");
        __classPrivateFieldSet(this, _Sphere_material, mat, "f");
    }
    hit(ray, interval) {
        const oc = __classPrivateFieldGet(this, _Sphere_center, "f").subtract(ray.origin);
        const a = ray.dir.lengthSquared();
        const h = ray.dir.dot(oc);
        const c = oc.lengthSquared() - __classPrivateFieldGet(this, _Sphere_radius, "f") * __classPrivateFieldGet(this, _Sphere_radius, "f");
        const discriminant = h * h - a * c;
        if (discriminant < 0) {
            return null;
        }
        const sqrtDiscriminant = Math.sqrt(discriminant);
        let t = (h - sqrtDiscriminant) / a;
        if (!interval.surrounds(t)) {
            t = (h + sqrtDiscriminant) / a;
            if (!interval.surrounds(t)) {
                return null;
            }
        }
        const point = ray.at(t);
        const outwardNormal = point.subtract(__classPrivateFieldGet(this, _Sphere_center, "f")).divide(__classPrivateFieldGet(this, _Sphere_radius, "f"));
        const isFrontFace = ray.dir.dot(outwardNormal) < 0;
        const normal = isFrontFace ? outwardNormal : outwardNormal.scale(-1);
        return { t, point, normal, isFrontFace, material: __classPrivateFieldGet(this, _Sphere_material, "f") };
    }
}
_Sphere_center = new WeakMap(), _Sphere_radius = new WeakMap(), _Sphere_material = new WeakMap();
exports.default = Sphere;
//# sourceMappingURL=sphere.js.map