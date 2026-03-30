import * as THREE from "three";
import { Renderer } from "./core/renderer.js";
import { Camera } from "./core/camera.js";
import { DirectionalLight } from "./objects/DirectionalLight.js";
import { player } from "./objects/Helicopter.js";
// import { map, initializeMap } from "./components/Map.js";
// import { animateVehicles } from "./animateVehicles.js";
// import "./collectUserInputs.js"
// import { animatePlayer } from "./animatePlayer.js";

const scene = new THREE.Scene();
scene.add(player);
// scene.add(map);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = DirectionalLight();
dirLight.position.set(-100, -100, 200);
scene.add(dirLight);

const camera = Camera();
scene.add(camera);

initializeGame();

function initializeGame() {
//   initializeMap();
}

const renderer = Renderer();
// renderer.render(scene, camera);
renderer.setAnimationLoop(animate);

function animate() {
    // animateVehicles();
    // animatePlayer();

    renderer.render(scene, camera);
}