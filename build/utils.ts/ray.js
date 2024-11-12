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
var _Ray_origin, _Ray_dir;
Object.defineProperty(exports, "__esModule", { value: true });
class Ray {
    constructor(orig, dir) {
        _Ray_origin.set(this, void 0);
        _Ray_dir.set(this, void 0);
        __classPrivateFieldSet(this, _Ray_origin, orig, "f");
        __classPrivateFieldSet(this, _Ray_dir, dir, "f");
    }
    at(t) {
        return __classPrivateFieldGet(this, _Ray_origin, "f").add(__classPrivateFieldGet(this, _Ray_dir, "f").scale(t));
    }
    get origin() {
        return __classPrivateFieldGet(this, _Ray_origin, "f");
    }
    get dir() {
        return __classPrivateFieldGet(this, _Ray_dir, "f");
    }
}
_Ray_origin = new WeakMap(), _Ray_dir = new WeakMap();
exports.default = Ray;
//# sourceMappingURL=ray.js.map