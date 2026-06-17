import * as THREE from "three";
import { OrbitControls} from "jsm/controls/OrbitControls.js"
import * as CANNON from "cannon";

function DirectionalLight() {
  const dirLight = new THREE.DirectionalLight();
  dirLight.position.set(-100, -100, 200);
  dirLight.up.set(0, 0, 1);
  dirLight.castShadow = true;

  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;

  dirLight.shadow.camera.up.set(0, 0, 1);
  dirLight.shadow.camera.left = -400;
  dirLight.shadow.camera.right = 400;
  dirLight.shadow.camera.top = 400;
  dirLight.shadow.camera.bottom = -400;
  dirLight.shadow.camera.near = 50;
  dirLight.shadow.camera.far = 400;

  return dirLight;
}

const w = window.innerWidth;
const h = window.innerHeight;
const desiredAltitude = 2;

const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const fov = 100;
const aspect = w / h;
const near = 0.1;
const far = 100;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 7;
camera.position.x = 5;
camera.position.y = 5;

camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
const world = new CANNON.World();

world.gravity.set(0, 0, -9.82);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const body = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
    position: new CANNON.Vec3(0,0,1)
});

body.linearDamping = 0.9;
body.angularDamping = 0.9;

const geo = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshLambertMaterial({
    color: 0xccff00ff,
    flatShading: true
});

const floorGeo = new THREE.PlaneGeometry(100, 100);
const floorMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    flatShading: true,
});

const floorMesh = new THREE.Mesh(floorGeo, floorMat);
scene.add(floorMesh);


const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);
world.addBody(body);


const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = DirectionalLight();
scene.add(dirLight);

// const wireMesh = new THREE.Mesh(geo, wireMat);
// mesh.add(wireMesh);

const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
};

window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key in keys) {
        keys[key] = true;
    }
});

window.addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();
    if (key in keys) {
        keys[key] = false;
    }
});

// body.velocity.y = -1;

function animate(t = 0){
    requestAnimationFrame(animate);
    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);

    let desiredAngularVel = keys['w'] ? Math.PI/4 : keys['s'] ? -Math.PI/4 : 0;
    let currentRot = new CANNON.Vec3(0, 0, 0);
    body.quaternion.toEuler(currentRot);
    
    let rotErr = desiredAngularVel - currentRot.x;
    body.angularVelocity = new CANNON.Vec3(5*rotErr, 0, 0);


    let err = desiredAltitude - body.position.z;
    let forceAlt = 10*err;
    let thrustForce = new CANNON.Vec3(0, -forceAlt*Math.sin(currentRot.x), forceAlt*Math.cos(currentRot.x));
    body.force = thrustForce;
    
    renderer.render(scene, camera);
    controls.update();
    world.step(0.01);
    
    t += 1
}

animate();