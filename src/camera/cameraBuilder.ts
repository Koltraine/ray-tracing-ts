import Vec3 from "../utils.ts/vec3";
import Camera from "./camera";


interface CameraConfig {
    aspectRatio: number;
    imageWidth: number;
    samplesPerPx: number;
    maxDepth: number;
    vfov: number;
    position: Vec3;
    lookAt: Vec3;
    vup: Vec3;
    defocusAngle: number;
    focusDist: number;
}

const DEFAULT_CONFIG = {
    aspectRatio: 1.0,
    imageWidth: 100,
    samplesPerPx: 10,
    maxDepth: 10,
    vfov: 90,
    position: Vec3.create(0, 0, 0),
    lookAt: Vec3.create(0, 0, -1),
    vup: Vec3.create(0, 1, 0),
    defocusAngle: 0,
    focusDist: 10,
};


class CameraBuilder {
    private aspectRatio: number;
    private imageWidth: number;
    private samplesPerPx: number;
    private maxDepth: number;
    private vfov: number;
    private position: Vec3;
    private lookAt: Vec3;
    private vup: Vec3;
    private defocusAngle: number;
    private focusDist: number;

    constructor(config: Partial<CameraConfig> = {}) {
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


    setAspectRatio(aspectRatio: number): CameraBuilder {
        this.aspectRatio = aspectRatio;
        return this;
    }

    setImageWidth(imageWidth: number): CameraBuilder {
        this.imageWidth = imageWidth;
        return this;
    }

    setSamplesPerPx(samplesPerPx: number): CameraBuilder {
        this.samplesPerPx = samplesPerPx;
        return this;
    }

    setMaxDepth(maxDepth: number): CameraBuilder {
        this.maxDepth = maxDepth;
        return this;
    }

    setVfov(vfov: number): CameraBuilder {
        this.vfov = vfov;
        return this;
    }

    setPosition(position: Vec3): CameraBuilder {
        this.position = position;
        return this;
    }

    setLookAt(lookAt: Vec3): CameraBuilder {
        this.lookAt = lookAt;
        return this;
    }

    setVup(vup: Vec3): CameraBuilder {
        this.vup = vup;
        return this;
    }

    setDefocusAngle(defocusAngle: number): CameraBuilder {
        this.defocusAngle = defocusAngle;
        return this;
    }

    setFocusDist(focusDist: number): CameraBuilder {
        this.focusDist = focusDist;
        return this;
    }

    build(): Camera {
        return new Camera(
            this.aspectRatio,
            this.imageWidth,
            this.samplesPerPx,
            this.maxDepth,
            this.vfov,
            this.position,
            this.lookAt,
            this.vup,
            this.defocusAngle,
            this.focusDist
        );
    }
}

export default CameraBuilder;
