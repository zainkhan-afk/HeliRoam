// scene.js
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export function createScene() {

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x000000);

    addLights(scene);

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

    const axes = new THREE.AxesHelper(5);

    scene.add(axes);

    const grid = new THREE.GridHelper(100, 100);

    scene.add(grid);

}