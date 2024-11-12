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
var _AlignedRect_vert1, _AlignedRect_vert2, _AlignedRect_material;
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = __importDefault(require("../utils.ts/vec3"));
const abstract_hittable_1 = __importDefault(require("./abstract-hittable"));
class AlignedRect extends abstract_hittable_1.default {
    constructor(vert1, vert2, mat) {
        super();
        _AlignedRect_vert1.set(this, void 0);
        _AlignedRect_vert2.set(this, void 0);
        _AlignedRect_material.set(this, void 0);
        __classPrivateFieldSet(this, _AlignedRect_vert1, vert1, "f");
        __classPrivateFieldSet(this, _AlignedRect_vert2, vert2, "f");
        __classPrivateFieldSet(this, _AlignedRect_material, mat, "f");
    }
    hit(ray, interval) {
        const t = -__classPrivateFieldGet(this, _AlignedRect_vert1, "f").z;
        if (!interval.surrounds(t)) {
            return null;
        }
        const x = ray.at(t).x;
        const y = ray.at(t).y;
        const v1x = __classPrivateFieldGet(this, _AlignedRect_vert1, "f").x;
        const v1y = __classPrivateFieldGet(this, _AlignedRect_vert1, "f").y;
        const v2x = __classPrivateFieldGet(this, _AlignedRect_vert2, "f").x;
        const v2y = __classPrivateFieldGet(this, _AlignedRect_vert2, "f").y;
        if (v1x <= x && v2x >= x && v1y <= y && v2y >= y) {
            const point = vec3_1.default.create(x, y, t);
            const normal = ray.dir;
            return { t, point, normal, isFrontFace: true, material: __classPrivateFieldGet(this, _AlignedRect_material, "f") };
        }
        return null;
    }
}
_AlignedRect_vert1 = new WeakMap(), _AlignedRect_vert2 = new WeakMap(), _AlignedRect_material = new WeakMap();
exports.default = AlignedRect;
//# sourceMappingURL=AlignedRect.js.map