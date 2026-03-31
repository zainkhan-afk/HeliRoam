import * as THREE from "three";
import { Renderer } from "./core/renderer.js";
import { Camera, UpdateCameraPos } from "./core/camera.js";
import { DirectionalLight } from "./objects/DirectionalLight.js";
import { Helicopter } from "./objects/Helicopter.js";
import { ground } from "./objects/Ground.js";
import { createScene } from "./core/scene.js"
import { InputController } from "./controllers/InputController.js";
import { HelicopterController } from "./controllers/HelicopterController.js";
import { createPhysicsWorld, stepPhysics } from "./core/physics.js";

// import { map, initializeMap } from "./components/Map.js";
// import { animateVehicles } from "./animateVehicles.js";
// import "./collectUserInputs.js"
// import { animatePlayer } from "./animatePlayer.js";

const scene = createScene();
const world = createPhysicsWorld();
const player = new Helicopter(scene, world)
const controller = new HelicopterController(player, new InputController())
// scene.add(player);
scene.add(ground);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = DirectionalLight();
scene.add(dirLight);

const camera = Camera();
scene.add(camera);

initializeGame();

function initializeGame() {
//   initializeMap();
}

const renderer = Renderer();
renderer.setAnimationLoop(animate);

let t = 0;
function animate() {
    // player.position.z = playerBaseHeight + 10*Math.sin(t);
    // animateVehicles();
    // animatePlayer();
    // player.mesh.rotateY(0.001*Math.sin(t));
    // player.mesh.rotation.x = -0.6;
    // player.mesh.rotateOnAxis(new THREE.Vector3(0, 0.8, -1), 0.01);
    t += 0.01;
    stepPhysics(world);
    controller.update();
    player.control();
    player.update();
    UpdateCameraPos(camera, player.mesh);
    renderer.render(scene, camera);
}