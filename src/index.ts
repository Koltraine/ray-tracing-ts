import Vec3 from './utils.ts/vec3';
import Sphere from './objects/sphere';
import AlignedRect from './objects/AlignedRect';
import HitableList from './hitable-list';
import Metal from './materials/metal';
import Color from './utils.ts/color';
import Export from './export/export';
import PPMExport from './export/ppm-export';
import Lambertian from './materials/lambertian';
import Dielectric from './materials/dielectric';
import CameraBuilder from './camera/cameraBuilder';
import { PI } from './utils.ts/utils';


const ppmExp: Export = new PPMExport("my-balls")

function fourBallScene(world: HitableList, cameraBuilder: CameraBuilder): void {

    const DarkMetal = new Metal(Color.create(0.2, 0.2, 0.2))
    const brightMetal = new Metal(Color.create(0.8, 0.8, 0.8))
    const materialGround = new Lambertian(Color.create(0.8, 0.8, 0.0));
    const materialCenter = new Lambertian(Color.create(0.1, 0.2, 0.5));
    const glass = new Dielectric(1.50)
    const bubble = new Dielectric(1.00 / 1.50)
    const materialRight = new Metal(Color.create(0.8, 0.6, 0.2), 0.2);

    //world.add(new Sphere(Vec3.create(-1.5, 0.0, 1.0), 2.5, DarkMetal));
    //world.add(new Sphere(Vec3.create(1.5, 0.0, 1.0), 2.5, brightMetal));
    world.add(new Sphere(Vec3.create(0.0, -100.5, -1.0), 100.0, materialGround));
    world.add(new Sphere(Vec3.create(0.0, 0.0, -1.2), 0.5, materialCenter));
    world.add(new Sphere(Vec3.create(-1, 0.0, -1.0), 0.5, glass));
    world.add(new Sphere(Vec3.create(-1.0, 0.0, -1.0), 0.4, bubble));
    world.add(new Sphere(Vec3.create(1, 0.0, -1.0), 0.5, materialRight));
    //world.add(new AlignedRect(Vec3.create(-1, -4, -.49), Vec3.create(1, 4, -4)));
}

function wideAngleScene(world: HitableList, cameraBuilder: CameraBuilder): void {

    const radius = Math.cos(PI / 4);

    const materialRight = new Lambertian(Color.create(1, 0, 0));
    const materialLeft = new Lambertian(Color.create(0, 0, 1));

    world.add(new Sphere(Vec3.create(-radius, 0, -1), radius, materialLeft));
    world.add(new Sphere(Vec3.create(radius, 0, -1), radius, materialRight));

    cameraBuilder.setVfov(90);
}

function diffCameraPositionScene(world: HitableList, cameraBuilder: CameraBuilder): void {
    const materialGround = new Lambertian(Color.create(0.8, 0.8, 0.0));
    const materialCenter = new Lambertian(Color.create(0.1, 0.2, 0.5));
    const materialLeft = new Dielectric(1.50);
    const materialBubble = new Dielectric(1.00 / 1.50);
    const materialRight = new Metal(Color.create(0.8, 0.6, 0.2), 1.0);

    world.add(new Sphere(Vec3.create(0.0, -100.5, -1.0), 100.0, materialGround));
    world.add(new Sphere(Vec3.create(0.0, 0.0, -1.2), 0.5, materialCenter));
    world.add(new Sphere(Vec3.create(-1.0, 0.0, -1.0), 0.5, materialLeft));
    world.add(new Sphere(Vec3.create(-1.0, 0.0, -1.0), 0.4, materialBubble));
    world.add(new Sphere(Vec3.create(1.0, 0.0, -1.0), 0.5, materialRight));

    cameraBuilder
        .setAspectRatio(16.0 / 9.0)
        .setImageWidth(400)
        .setSamplesPerPx(30)
        .setMaxDepth(25)
        .setVfov(20)
        .setPosition(Vec3.create(-2, 2, 1))
        .setLookAt(Vec3.create(0, 0, -1))
        .setVup(Vec3.create(0, 1, 0))
        .setDefocusAngle(10)
        .setFocusDist(3.4)

}

function finalScene(world: HitableList, cameraBuilder: CameraBuilder): void {
    const groundMaterial = new Lambertian(Color.create(0.5, 0.5, 0.5));
    world.add(new Sphere(Vec3.create(0, -1000, 0), 1000, groundMaterial));

    for (let a = -11; a < 11; a++) {
        for (let b = -11; b < 11; b++) {
            const chooseMat = Math.random();
            const center = Vec3.create(a + 0.9 * Math.random(), 0.2, b + 0.9 * Math.random());

            if (center.subtract(Vec3.create(4, 0.2, 0)).length() > 0.9) {
                let sphereMaterial;

                if (chooseMat < 0.8) {
                    // diffuse
                    const albedo = Color.createRandom().attenuate(Color.createRandom());
                    sphereMaterial = new Lambertian(albedo);
                    world.add(new Sphere(center, 0.2, sphereMaterial));
                } else if (chooseMat < 0.95) {
                    // metal
                    const albedo = Color.createRandom(0.5, 1);
                    const fuzz = Math.random() * 0.5;
                    sphereMaterial = new Metal(albedo, fuzz);
                    world.add(new Sphere(center, 0.2, sphereMaterial));
                } else {
                    // glass
                    sphereMaterial = new Dielectric(1.5);
                    world.add(new Sphere(center, 0.2, sphereMaterial));
                }
            }
        }
    }

    const material1 = new Dielectric(1.5);
    world.add(new Sphere(Vec3.create(0, 1, 0), 1.0, material1));

    const material2 = new Lambertian(Color.create(0.4, 0.2, 0.1));
    world.add(new Sphere(Vec3.create(-4, 1, 0), 1.0, material2));

    const material3 = new Metal(Color.create(0.7, 0.6, 0.5), 0.0);
    world.add(new Sphere(Vec3.create(4, 1, 0), 1.0, material3));

    cameraBuilder
        .setAspectRatio(16.0 / 9.0)
        .setImageWidth(400)
        .setSamplesPerPx(500)
        .setMaxDepth(50)
        .setVfov(20)
        .setPosition(Vec3.create(13, 2, 3))
        .setLookAt(Vec3.create(0, 0, 0))
        .setVup(Vec3.create(0, 1, 0))
        .setDefocusAngle(0.6)
        .setFocusDist(10.0)
}


function main() {
    const world: HitableList = new HitableList()
    const cameraBuilder = new CameraBuilder()

    // Scene "Selector"
    //fourBallScene(world, cameraBuilder)
    //wideAngleScene(world, cameraBuilder)
    diffCameraPositionScene(world, cameraBuilder)
    //finalScene(world, cameraBuilder)

    const camera = cameraBuilder.build()

    console.time('Render Time');
    const content = camera.render(world, Infinity);
    console.timeEnd('Render Time');

    // export
    ppmExp.export(content);
}

main();



