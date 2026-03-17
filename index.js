
import { createRenderer, handleResize } from "./core/renderer.js";
import { createPhysicsWorld, stepPhysics } from "./core/physics.js";
import { createScene } from "./core/scene.js";
import { createCamera } from "./core/camera.js";
import { Helicopter } from "./objects/Helicopter.js";

import { InputController } from "./controllers/InputController.js";
import { HelicopterController } from "./controllers/HelicopterController.js";

const renderer = createRenderer();
const scene = createScene();
const physics = createPhysicsWorld();
const camera  = createCamera();

const helicopter = new Helicopter(scene, physics);

const input = new InputController();
const heliController = new HelicopterController(helicopter, input);

let lifting = false;

window.addEventListener("mousedown", () => lifting = true);
window.addEventListener("mouseup", () => lifting = false);

function animate(){
    requestAnimationFrame(animate);
    heliController.update();
    stepPhysics(physics);
    helicopter.update();
    renderer.render(scene, camera);
}

animate();