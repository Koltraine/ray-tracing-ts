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
var _Color_values;
Object.defineProperty(exports, "__esModule", { value: true });
const interval_1 = __importDefault(require("./interval"));
const utils_1 = require("./utils");
class Color {
    constructor(v1 = 0, v2 = 0, v3 = 0) {
        _Color_values.set(this, void 0);
        __classPrivateFieldSet(this, _Color_values, new Float64Array([v1, v2, v3]), "f");
    }
    static create(v1 = 0, v2 = 0, v3 = 0) {
        return new Color(v1, v2, v3);
    }
    static createFromArray(arr) {
        if (arr.length !== 3) {
            throw new Error("Array must have exactly three elements.");
        }
        return new Color(arr[0], arr[1], arr[2]);
    }
    static createRandom(min = 0, max = 1) {
        const r = (0, utils_1.genRandomNumberInRange)(min, max);
        const g = (0, utils_1.genRandomNumberInRange)(min, max);
        const b = (0, utils_1.genRandomNumberInRange)(min, max);
        return new Color(r, g, b);
    }
    add(toSum) {
        return new Color(__classPrivateFieldGet(this, _Color_values, "f")[0] + __classPrivateFieldGet(toSum, _Color_values, "f")[0], __classPrivateFieldGet(this, _Color_values, "f")[1] + __classPrivateFieldGet(toSum, _Color_values, "f")[1], __classPrivateFieldGet(this, _Color_values, "f")[2] + __classPrivateFieldGet(toSum, _Color_values, "f")[2]);
    }
    scale(scalar) {
        return new Color(__classPrivateFieldGet(this, _Color_values, "f")[0] * scalar, __classPrivateFieldGet(this, _Color_values, "f")[1] * scalar, __classPrivateFieldGet(this, _Color_values, "f")[2] * scalar);
    }
    attenuate(attenuation) {
        return new Color(__classPrivateFieldGet(this, _Color_values, "f")[0] * __classPrivateFieldGet(attenuation, _Color_values, "f")[0], __classPrivateFieldGet(this, _Color_values, "f")[1] * __classPrivateFieldGet(attenuation, _Color_values, "f")[1], __classPrivateFieldGet(this, _Color_values, "f")[2] * __classPrivateFieldGet(attenuation, _Color_values, "f")[2]);
    }
    print() {
        console.log(`[${__classPrivateFieldGet(this.toBase255(), _Color_values, "f").join(', ')}]`);
    }
    toBase255() {
        const intensity = new interval_1.default(0, 0.999);
        return new Color(Math.floor(256 * intensity.clamp(__classPrivateFieldGet(this, _Color_values, "f")[0])), Math.floor(256 * intensity.clamp(__classPrivateFieldGet(this, _Color_values, "f")[1])), Math.floor(256 * intensity.clamp(__classPrivateFieldGet(this, _Color_values, "f")[2])));
    }
    toString() {
        return __classPrivateFieldGet(this.toGama().toBase255(), _Color_values, "f").join(" ");
    }
    toGama() {
        return new Color((__classPrivateFieldGet(this, _Color_values, "f")[0] <= 0) ? 0 : Math.sqrt(__classPrivateFieldGet(this, _Color_values, "f")[0]), (__classPrivateFieldGet(this, _Color_values, "f")[1] <= 0) ? 0 : Math.sqrt(__classPrivateFieldGet(this, _Color_values, "f")[1]), (__classPrivateFieldGet(this, _Color_values, "f")[2] <= 0) ? 0 : Math.sqrt(__classPrivateFieldGet(this, _Color_values, "f")[2]));
    }
    // Getters
    get r() {
        return __classPrivateFieldGet(this, _Color_values, "f")[0];
    }
    get g() {
        return __classPrivateFieldGet(this, _Color_values, "f")[1];
    }
    get b() {
        return __classPrivateFieldGet(this, _Color_values, "f")[2];
    }
}
_Color_values = new WeakMap();
exports.default = Color;
//# sourceMappingURL=color.js.map