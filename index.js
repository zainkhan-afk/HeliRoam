
import { createRenderer, handleResize } from "./core/renderer.js";
import { createPhysicsWorld, stepPhysics } from "./core/physics.js";
import { createScene } from "./core/scene.js";
import { createCamera } from "./core/camera.js";
import { Helicopter } from "./objects/Helicopter.js";

const renderer = createRenderer();
const scene = createScene();
const physics = createPhysicsWorld();
const camera  = createCamera();

const helicopter = new Helicopter(scene, physics);

let lifting = false;

window.addEventListener("mousedown", () => lifting = true);
window.addEventListener("mouseup", () => lifting = false);

function animate(){
    requestAnimationFrame(animate);
    if (lifting) {
        helicopter.applyLift();
    }
    stepPhysics(physics);
    helicopter.update();
    renderer.render(scene, camera);
}

animate();