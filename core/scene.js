// scene.js
import * as THREE from "three";

export function createScene() {

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0xffffff);

    // addLights(scene);

    addHelpers(scene);

    return scene;
}


function addLights(scene) {

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    directionalLight.position.set(5, 10, 5);

    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);

    scene.add(ambientLight);

}


function addHelpers(scene) {
    const axes = new THREE.AxesHelper(50);

    scene.add(axes);

    // const grid = new THREE.GridHelper(500, 20);
    // grid.rotation.x = Math.PI / 2;
    // grid.position.z = 1;

    // scene.add(grid);
}