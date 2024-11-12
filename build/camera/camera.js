"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = __importDefault(require("../utils.ts/color"));
const interval_1 = __importDefault(require("../utils.ts/interval"));
const ray_1 = __importDefault(require("../utils.ts/ray"));
const utils_1 = require("../utils.ts/utils");
const vec3_1 = __importDefault(require("../utils.ts/vec3"));
class Camera {
    constructor(aspectRatio, imageWidth, samplesPerPx, maxDepth, vfov, position, lookAt, vup, defocusAngle, focusDist) {
        this.width = imageWidth;
        this.center = position;
        this.samplesPerPx = samplesPerPx;
        this.maxDepth = maxDepth;
        this.defocusAngle = defocusAngle;
        this.samplesScale = 1 / this.samplesPerPx;
        // Calculate Height and assure its at least 1
        const calcHeight = Math.floor(this.width / aspectRatio);
        this.height = calcHeight === 0 ? 1 : calcHeight;
        // viewport
        const theta = (0, utils_1.degreesToRadians)(vfov);
        const h = Math.tan(theta / 2);
        const vpHeight = 2 * h * focusDist;
        const vpWidth = vpHeight * (this.width / this.height);
        // Calculate the vectors across the horizontal and down the vertical viewport edges.
        const w = position.subtract(lookAt).normalize();
        const u = vup.cross(w).normalize();
        const v = w.cross(u);
        const viewportU = u.scale(vpWidth);
        const viewportV = v.scale(-vpHeight);
        // Calculate the horizontal and vertical delta vectors from pixel to pixel.
        this.pxDeltaU = viewportU.divide(this.width);
        this.pxDeltaV = viewportV.divide(this.height);
        // Calculate the location of the upper left pixel.
        const viewportUpperLeft = position.subtract(w.scale(focusDist)).subtract(viewportU.scale(0.5)).subtract(viewportV.scale(0.5));
        this.px00Loc = viewportUpperLeft.add(this.pxDeltaU.add(this.pxDeltaV).scale(0.5));
        const defocusRadius = focusDist * Math.tan((0, utils_1.degreesToRadians)(defocusAngle / 2));
        this.defocusDiskU = u.scale(defocusRadius);
        this.defocusDiskV = v.scale(defocusRadius);
    }
    render(world, maxDist) {
        const inter = new interval_1.default(0.001, maxDist);
        let content = `P3\n${this.width} ${this.height}\n255\n`;
        for (let i = 0; i < this.height; i++) {
            console.log(`File rows reamaining: ${this.height - i}`);
            for (let j = 0; j < this.width; j++) {
                let pixelColor = color_1.default.create(0, 0, 0);
                for (let sample = 0; sample < this.samplesPerPx; sample++) {
                    const ray = this.getRay(i, j);
                    pixelColor = pixelColor.add(this.rayColor(ray, world, this.maxDepth, inter));
                }
                content += pixelColor.scale(this.samplesScale).toString() + '\n';
            }
        }
        return content;
    }
    getRay(i, j) {
        const offset = this.sampleSquare();
        const pixel_sample = this.px00Loc.add(this.pxDeltaU.scale(j + offset.x)).add(this.pxDeltaV.scale(i + offset.y));
        // subtract ray origin to get ray dir
        const rayOrig = (this.defocusAngle <= 0) ? this.center : this.defocusDiskSample();
        const rayDir = pixel_sample.subtract(rayOrig);
        return new ray_1.default(rayOrig, rayDir);
    }
    sampleSquare() {
        // Returns the vector to a random point in the [-.5,-.5]-[+.5,+.5] unit square.
        return vec3_1.default.create((0, utils_1.genRandomNumber)() - 0.5, (0, utils_1.genRandomNumber)() - 0.5, 0);
    }
    rayColor(ray, world, maxDepth, interval) {
        if (maxDepth <= 0) {
            return color_1.default.create(0, 0, 0);
        }
        const hitRec = world.hit(ray, interval);
        if (hitRec !== null) {
            const scatter = hitRec.material.scatter(ray, hitRec);
            if (scatter) {
                const { attenuation, scattered } = scatter;
                return this.rayColor(scattered, world, maxDepth - 1, interval).attenuate(attenuation);
            }
            return color_1.default.create(0, 0, 0);
        }
        const a = 0.5 * (ray.dir.y + 1.0);
        const blue = color_1.default.create(0.5, 0.7, 1.0);
        const white = color_1.default.create(1.0, 1.0, 1.0);
        // const red = Color.create(.95, .2, .2)
        // const yellow = Color.create(.94, .93, .3)
        return white.scale(1.0 - a).add(blue.scale(a));
    }
    defocusDiskSample() {
        // Returns a random point in the camera defocus disk.
        const p = vec3_1.default.createRandomOnUnitDisk();
        return this.center.add(this.defocusDiskU.scale(p.x)).add(this.defocusDiskV.scale(p.y));
    }
}
exports.default = Camera;
//# sourceMappingURL=camera.js.map