"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = __importDefault(require("./utils.ts/vec3"));
const sphere_1 = __importDefault(require("./objects/sphere"));
const hitable_list_1 = __importDefault(require("./hitable-list"));
const metal_1 = __importDefault(require("./materials/metal"));
const color_1 = __importDefault(require("./utils.ts/color"));
const ppm_export_1 = __importDefault(require("./export/ppm-export"));
const lambertian_1 = __importDefault(require("./materials/lambertian"));
const dielectric_1 = __importDefault(require("./materials/dielectric"));
const cameraBuilder_1 = __importDefault(require("./camera/cameraBuilder"));
const utils_1 = require("./utils.ts/utils");
const ppmExp = new ppm_export_1.default("my-balls");
function fourBallScene(world, cameraBuilder) {
    const DarkMetal = new metal_1.default(color_1.default.create(0.2, 0.2, 0.2));
    const brightMetal = new metal_1.default(color_1.default.create(0.8, 0.8, 0.8));
    const materialGround = new lambertian_1.default(color_1.default.create(0.8, 0.8, 0.0));
    const materialCenter = new lambertian_1.default(color_1.default.create(0.1, 0.2, 0.5));
    const glass = new dielectric_1.default(1.50);
    const bubble = new dielectric_1.default(1.00 / 1.50);
    const materialRight = new metal_1.default(color_1.default.create(0.8, 0.6, 0.2), 0.2);
    //world.add(new Sphere(Vec3.create(-1.5, 0.0, 1.0), 2.5, DarkMetal));
    //world.add(new Sphere(Vec3.create(1.5, 0.0, 1.0), 2.5, brightMetal));
    world.add(new sphere_1.default(vec3_1.default.create(0.0, -100.5, -1.0), 100.0, materialGround));
    world.add(new sphere_1.default(vec3_1.default.create(0.0, 0.0, -1.2), 0.5, materialCenter));
    world.add(new sphere_1.default(vec3_1.default.create(-1, 0.0, -1.0), 0.5, glass));
    world.add(new sphere_1.default(vec3_1.default.create(-1.0, 0.0, -1.0), 0.4, bubble));
    world.add(new sphere_1.default(vec3_1.default.create(1, 0.0, -1.0), 0.5, materialRight));
    //world.add(new AlignedRect(Vec3.create(-1, -4, -.49), Vec3.create(1, 4, -4)));
}
function wideAngleScene(world, cameraBuilder) {
    const radius = Math.cos(utils_1.PI / 4);
    const materialRight = new lambertian_1.default(color_1.default.create(1, 0, 0));
    const materialLeft = new lambertian_1.default(color_1.default.create(0, 0, 1));
    world.add(new sphere_1.default(vec3_1.default.create(-radius, 0, -1), radius, materialLeft));
    world.add(new sphere_1.default(vec3_1.default.create(radius, 0, -1), radius, materialRight));
    cameraBuilder.setVfov(90);
}
function diffCameraPositionScene(world, cameraBuilder) {
    const materialGround = new lambertian_1.default(color_1.default.create(0.8, 0.8, 0.0));
    const materialCenter = new lambertian_1.default(color_1.default.create(0.1, 0.2, 0.5));
    const materialLeft = new dielectric_1.default(1.50);
    const materialBubble = new dielectric_1.default(1.00 / 1.50);
    const materialRight = new metal_1.default(color_1.default.create(0.8, 0.6, 0.2), 1.0);
    world.add(new sphere_1.default(vec3_1.default.create(0.0, -100.5, -1.0), 100.0, materialGround));
    world.add(new sphere_1.default(vec3_1.default.create(0.0, 0.0, -1.2), 0.5, materialCenter));
    world.add(new sphere_1.default(vec3_1.default.create(-1.0, 0.0, -1.0), 0.5, materialLeft));
    world.add(new sphere_1.default(vec3_1.default.create(-1.0, 0.0, -1.0), 0.4, materialBubble));
    world.add(new sphere_1.default(vec3_1.default.create(1.0, 0.0, -1.0), 0.5, materialRight));
    cameraBuilder
        .setAspectRatio(16.0 / 9.0)
        .setImageWidth(400)
        .setSamplesPerPx(30)
        .setMaxDepth(25)
        .setVfov(20)
        .setPosition(vec3_1.default.create(-2, 2, 1))
        .setLookAt(vec3_1.default.create(0, 0, -1))
        .setVup(vec3_1.default.create(0, 1, 0))
        .setDefocusAngle(10)
        .setFocusDist(3.4);
}
function finalScene(world, cameraBuilder) {
    const groundMaterial = new lambertian_1.default(color_1.default.create(0.5, 0.5, 0.5));
    world.add(new sphere_1.default(vec3_1.default.create(0, -1000, 0), 1000, groundMaterial));
    for (let a = -11; a < 11; a++) {
        for (let b = -11; b < 11; b++) {
            const chooseMat = Math.random();
            const center = vec3_1.default.create(a + 0.9 * Math.random(), 0.2, b + 0.9 * Math.random());
            if (center.subtract(vec3_1.default.create(4, 0.2, 0)).length() > 0.9) {
                let sphereMaterial;
                if (chooseMat < 0.8) {
                    // diffuse
                    const albedo = color_1.default.createRandom().attenuate(color_1.default.createRandom());
                    sphereMaterial = new lambertian_1.default(albedo);
                    world.add(new sphere_1.default(center, 0.2, sphereMaterial));
                }
                else if (chooseMat < 0.95) {
                    // metal
                    const albedo = color_1.default.createRandom(0.5, 1);
                    const fuzz = Math.random() * 0.5;
                    sphereMaterial = new metal_1.default(albedo, fuzz);
                    world.add(new sphere_1.default(center, 0.2, sphereMaterial));
                }
                else {
                    // glass
                    sphereMaterial = new dielectric_1.default(1.5);
                    world.add(new sphere_1.default(center, 0.2, sphereMaterial));
                }
            }
        }
    }
    const material1 = new dielectric_1.default(1.5);
    world.add(new sphere_1.default(vec3_1.default.create(0, 1, 0), 1.0, material1));
    const material2 = new lambertian_1.default(color_1.default.create(0.4, 0.2, 0.1));
    world.add(new sphere_1.default(vec3_1.default.create(-4, 1, 0), 1.0, material2));
    const material3 = new metal_1.default(color_1.default.create(0.7, 0.6, 0.5), 0.0);
    world.add(new sphere_1.default(vec3_1.default.create(4, 1, 0), 1.0, material3));
    cameraBuilder
        .setAspectRatio(16.0 / 9.0)
        .setImageWidth(400)
        .setSamplesPerPx(500)
        .setMaxDepth(50)
        .setVfov(20)
        .setPosition(vec3_1.default.create(13, 2, 3))
        .setLookAt(vec3_1.default.create(0, 0, 0))
        .setVup(vec3_1.default.create(0, 1, 0))
        .setDefocusAngle(0.6)
        .setFocusDist(10.0);
}
function main() {
    const world = new hitable_list_1.default();
    const cameraBuilder = new cameraBuilder_1.default();
    // Scene "Selector"
    //fourBallScene(world, cameraBuilder)
    //wideAngleScene(world, cameraBuilder)
    diffCameraPositionScene(world, cameraBuilder);
    //finalScene(world, cameraBuilder)
    const camera = cameraBuilder.build();
    console.time('Render Time');
    const content = camera.render(world, Infinity);
    console.timeEnd('Render Time');
    // export
    ppmExp.export(content);
}
main();
//# sourceMappingURL=index.js.map