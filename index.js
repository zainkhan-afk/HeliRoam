
import { createRenderer, handleResize } from "./core/renderer.js";
import { createPhysicsWorld, stepPhysics } from "./core/physics.js";
import { createScene } from "./core/scene.js";
import { createCamera } from "./core/camera.js";

const renderer = createRenderer();
const scene = createScene();
const physics = createPhysicsWorld();
const camera  = createCamera();


function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();