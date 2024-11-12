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
var _Interval_min, _Interval_max;
Object.defineProperty(exports, "__esModule", { value: true });
class Interval {
    constructor(min, max) {
        _Interval_min.set(this, void 0);
        _Interval_max.set(this, void 0);
        __classPrivateFieldSet(this, _Interval_min, min, "f");
        __classPrivateFieldSet(this, _Interval_max, max, "f");
    }
    contains(num) {
        return num >= __classPrivateFieldGet(this, _Interval_min, "f") && num <= __classPrivateFieldGet(this, _Interval_max, "f");
    }
    surrounds(num) {
        return num > __classPrivateFieldGet(this, _Interval_min, "f") && num < __classPrivateFieldGet(this, _Interval_max, "f");
    }
    clamp(num) {
        return Math.min(Math.max(num, __classPrivateFieldGet(this, _Interval_min, "f")), __classPrivateFieldGet(this, _Interval_max, "f"));
    }
    size() {
        __classPrivateFieldGet(this, _Interval_max, "f") - __classPrivateFieldGet(this, _Interval_min, "f");
    }
    get min() {
        return __classPrivateFieldGet(this, _Interval_min, "f");
    }
    get max() {
        return __classPrivateFieldGet(this, _Interval_max, "f");
    }
}
_Interval_min = new WeakMap(), _Interval_max = new WeakMap();
exports.default = Interval;
//# sourceMappingURL=interval.js.map