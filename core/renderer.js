// renderer.js
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export function createRenderer() {

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);

    return renderer;
}


export function handleResize(renderer, camera) {

    window.addEventListener("resize", () => {

        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    });

}