import { normalize } from "path";
import HitableList from "../hitable-list";
import Color from "../utils.ts/color";
import Interval from "../utils.ts/interval";
import Ray from "../utils.ts/ray";
import { degreesToRadians, genRandomNumber } from "../utils.ts/utils";
import Vec3 from "../utils.ts/vec3";

export default class Camera {

    // camera position
    private center: Vec3;

    //antialiasing
    private samplesPerPx: number;
    private samplesScale: number;

    //bounce limit
    private maxDepth: number;

    //size
    private width: number;
    private height: number;

    private px00Loc: Vec3;
    private pxDeltaU: Vec3;
    private pxDeltaV: Vec3;

    private defocusAngle: number
    private defocusDiskU: Vec3
    private defocusDiskV: Vec3



    constructor(
        aspectRatio: number,
        imageWidth: number,
        samplesPerPx: number,
        maxDepth: number,
        vfov: number,
        position: Vec3,
        lookAt: Vec3,
        vup: Vec3,
        defocusAngle: number,
        focusDist: number
    ) {
        this.width = imageWidth
        this.center = position
        this.samplesPerPx = samplesPerPx
        this.maxDepth = maxDepth
        this.defocusAngle = defocusAngle
        this.samplesScale = 1 / this.samplesPerPx

        // Calculate Height and assure its at least 1
        const calcHeight = Math.floor(this.width / aspectRatio)
        this.height = calcHeight === 0 ? 1 : calcHeight

        // viewport
        const theta = degreesToRadians(vfov)
        const h = Math.tan(theta / 2)

        const vpHeight = 2 * h * focusDist
        const vpWidth = vpHeight * (this.width / this.height)

        // Calculate the vectors across the horizontal and down the vertical viewport edges.
        const w = position.subtract(lookAt).normalize()
        const u = vup.cross(w).normalize()
        const v = w.cross(u)

        const viewportU = u.scale(vpWidth)
        const viewportV = v.scale(-vpHeight)

        // Calculate the horizontal and vertical delta vectors from pixel to pixel.
        this.pxDeltaU = viewportU.divide(this.width)
        this.pxDeltaV = viewportV.divide(this.height)

        // Calculate the location of the upper left pixel.
        const viewportUpperLeft = position.subtract(w.scale(focusDist)).subtract(viewportU.scale(0.5)).subtract(viewportV.scale(0.5))
        this.px00Loc = viewportUpperLeft.add(this.pxDeltaU.add(this.pxDeltaV).scale(0.5))

        const defocusRadius = focusDist * Math.tan(degreesToRadians(defocusAngle / 2))
        this.defocusDiskU = u.scale(defocusRadius)
        this.defocusDiskV = v.scale(defocusRadius)
    }

    render(world: HitableList, maxDist: number) {

        const inter = new Interval(0.001, maxDist)

        let content: string = `P3\n${this.width} ${this.height}\n255\n`

        for (let i: number = 0; i < this.height; i++) {
            console.log(`File rows reamaining: ${this.height - i}`);
            for (let j: number = 0; j < this.width; j++) {

                let pixelColor = Color.create(0, 0, 0)

                for (let sample = 0; sample < this.samplesPerPx; sample++) {
                    const ray = this.getRay(i, j);
                    pixelColor = pixelColor.add(this.rayColor(ray, world, this.maxDepth, inter))
                }

                content += pixelColor.scale(this.samplesScale).toString() + '\n'
            }
        }

        return content
    }

    private getRay(i: number, j: number) {
        const offset = this.sampleSquare()

        const pixel_sample = this.px00Loc.add(this.pxDeltaU.scale(j + offset.x)).add(this.pxDeltaV.scale(i + offset.y))

        // subtract ray origin to get ray dir
        const rayOrig = (this.defocusAngle <= 0) ? this.center : this.defocusDiskSample();
        const rayDir = pixel_sample.subtract(rayOrig)

        return new Ray(rayOrig, rayDir);
    }

    private sampleSquare() {
        // Returns the vector to a random point in the [-.5,-.5]-[+.5,+.5] unit square.
        return Vec3.create(genRandomNumber() - 0.5, genRandomNumber() - 0.5, 0);
    }

    private rayColor(ray: Ray, world: HitableList, maxDepth: number, interval: Interval): Color {

        if (maxDepth <= 0) {
            return Color.create(0, 0, 0)
        }

        const hitRec = world.hit(ray, interval)

        if (hitRec !== null) {
            const scatter = hitRec.material.scatter(ray, hitRec)
            if (scatter) {
                const { attenuation, scattered } = scatter
                return this.rayColor(scattered, world, maxDepth - 1, interval).attenuate(attenuation)
            }
            return Color.create(0, 0, 0)
        }

        const a = 0.5 * (ray.dir.y + 1.0);

        const blue = Color.create(0.5, 0.7, 1.0)
        const white = Color.create(1.0, 1.0, 1.0)

        // const red = Color.create(.95, .2, .2)
        // const yellow = Color.create(.94, .93, .3)

        return white.scale(1.0 - a).add(blue.scale(a))
    }

    private defocusDiskSample(): Vec3 {
        // Returns a random point in the camera defocus disk.
        const p = Vec3.createRandomOnUnitDisk();
        return this.center.add(this.defocusDiskU.scale(p.x)).add(this.defocusDiskV.scale(p.y));
    }

}
