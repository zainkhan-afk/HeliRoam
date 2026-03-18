
import { createRenderer, handleResize } from "./core/renderer.js";
import { createPhysicsWorld, stepPhysics } from "./core/physics.js";
import { createScene } from "./core/scene.js";
import { createCamera } from "./core/camera.js";
import { Helicopter } from "./objects/Helicopter.js";

import { InputController } from "./controllers/InputController.js";
import { HelicopterController } from "./controllers/HelicopterController.js";

import { OrbitControls} from "jsm/controls/OrbitControls.js"

const renderer = createRenderer();
const scene = createScene();
const physics = createPhysicsWorld();
const camera  = createCamera();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
const helicopter = new Helicopter(scene, physics);

const input = new InputController();
const heliController = new HelicopterController(helicopter, input);

let lifting = false;

window.addEventListener("mousedown", () => lifting = true);
window.addEventListener("mouseup", () => lifting = false);
let t = 0;
function animate(){
    requestAnimationFrame(animate);
    heliController.update();
    helicopter.hover();
    stepPhysics(physics);
    helicopter.update();
    renderer.render(scene, camera);
    controls.update();

    t += 0.01;
}

animate();