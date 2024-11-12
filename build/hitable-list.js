"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _HitableList_hittables;
Object.defineProperty(exports, "__esModule", { value: true });
const interval_1 = __importDefault(require("./utils.ts/interval"));
class HitableList {
    constructor() {
        _HitableList_hittables.set(this, []);
    }
    add(hitable) {
        __classPrivateFieldGet(this, _HitableList_hittables, "f").push(hitable);
    }
    hit(ray, interval) {
        const { min, max } = interval;
        let closest = max;
        let closestHR = null;
        for (let obj of __classPrivateFieldGet(this, _HitableList_hittables, "f")) {
            const hitRec = obj.hit(ray, new interval_1.default(min, closest));
            if (hitRec !== null) {
                closest = hitRec.t;
                closestHR = hitRec;
            }
        }
        return closestHR;
    }
}
_HitableList_hittables = new WeakMap();
exports.default = HitableList;
//# sourceMappingURL=hitable-list.js.map