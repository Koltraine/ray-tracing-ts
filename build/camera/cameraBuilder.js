"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = __importDefault(require("../utils.ts/vec3"));
const camera_1 = __importDefault(require("./camera"));
const DEFAULT_CONFIG = {
    aspectRatio: 1.0,
    imageWidth: 100,
    samplesPerPx: 10,
    maxDepth: 10,
    vfov: 90,
    position: vec3_1.default.create(0, 0, 0),
    lookAt: vec3_1.default.create(0, 0, -1),
    vup: vec3_1.default.create(0, 1, 0),
    defocusAngle: 0,
    focusDist: 10,
};
class CameraBuilder {
    constructor(config = {}) {
        this.aspectRatio = config.aspectRatio ?? DEFAULT_CONFIG.aspectRatio;
        this.imageWidth = config.imageWidth ?? DEFAULT_CONFIG.imageWidth;
        this.samplesPerPx = config.samplesPerPx ?? DEFAULT_CONFIG.samplesPerPx;
        this.maxDepth = config.maxDepth ?? DEFAULT_CONFIG.maxDepth;
        this.vfov = config.vfov ?? DEFAULT_CONFIG.vfov;
        this.position = config.position ?? DEFAULT_CONFIG.position;
        this.lookAt = config.lookAt ?? DEFAULT_CONFIG.lookAt;
        this.vup = config.vup ?? DEFAULT_CONFIG.vup;
        this.defocusAngle = config.defocusAngle ?? DEFAULT_CONFIG.defocusAngle;
        this.focusDist = config.focusDist ?? DEFAULT_CONFIG.focusDist;
    }
    setAspectRatio(aspectRatio) {
        this.aspectRatio = aspectRatio;
        return this;
    }
    setImageWidth(imageWidth) {
        this.imageWidth = imageWidth;
        return this;
    }
    setSamplesPerPx(samplesPerPx) {
        this.samplesPerPx = samplesPerPx;
        return this;
    }
    setMaxDepth(maxDepth) {
        this.maxDepth = maxDepth;
        return this;
    }
    setVfov(vfov) {
        this.vfov = vfov;
        return this;
    }
    setPosition(position) {
        this.position = position;
        return this;
    }
    setLookAt(lookAt) {
        this.lookAt = lookAt;
        return this;
    }
    setVup(vup) {
        this.vup = vup;
        return this;
    }
    setDefocusAngle(defocusAngle) {
        this.defocusAngle = defocusAngle;
        return this;
    }
    setFocusDist(focusDist) {
        this.focusDist = focusDist;
        return this;
    }
    build() {
        return new camera_1.default(this.aspectRatio, this.imageWidth, this.samplesPerPx, this.maxDepth, this.vfov, this.position, this.lookAt, this.vup, this.defocusAngle, this.focusDist);
    }
}
exports.default = CameraBuilder;
//# sourceMappingURL=cameraBuilder.js.map