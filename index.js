import { createRenderer, handleResize } from "./core/renderer";
import { createPhysicsWorld, stepPhysics } from "./core/physics";
import { createScene } from "./core/scene";
import { createCamera } from "./core/camera";

const renderer = createRenderer();
const scene = createScene();
const physics = createPhysicsWorld();
const camera  = createCamera();


function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();