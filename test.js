import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import * as CANNON from "https://cdn.skypack.dev/cannon-es";

/////////////////////////
// THREE SCENE
/////////////////////////

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(6,6,6);
camera.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/////////////////////////
// LIGHTING
/////////////////////////

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,10,5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

/////////////////////////
// PHYSICS WORLD
/////////////////////////

const world = new CANNON.World();
world.gravity.set(0,-9.82,0);

/////////////////////////
// GROUND
/////////////////////////

const planeGeo = new THREE.PlaneGeometry(20,20);
const planeMat = new THREE.MeshStandardMaterial({color:0x808080});
const planeMesh = new THREE.Mesh(planeGeo,planeMat);

planeMesh.rotation.x = -Math.PI/2;

scene.add(planeMesh);

const planeBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane()
});

planeBody.quaternion.setFromEuler(-Math.PI/2,0,0);

world.addBody(planeBody);

/////////////////////////
// HELICOPTER CUBE
/////////////////////////

const cubeGeo = new THREE.BoxGeometry(1,1,1);
const cubeMat = new THREE.MeshStandardMaterial({color:0x00ff00});
const cubeMesh = new THREE.Mesh(cubeGeo,cubeMat);

scene.add(cubeMesh);

const cubeBody = new CANNON.Body({
  mass: 1,
  shape: new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5)),
  position: new CANNON.Vec3(0,5,0)
});

cubeBody.linearDamping = 0.4;

world.addBody(cubeBody);

/////////////////////////
// HELICOPTER LIFT
/////////////////////////

let lifting = false;

const liftBtn = document.getElementById("liftBtn");

liftBtn.addEventListener("mousedown", () => lifting = true);
liftBtn.addEventListener("mouseup", () => lifting = false);

/////////////////////////
// ANIMATION LOOP
/////////////////////////

function animate() {

  requestAnimationFrame(animate);

  // Apply lift force
  if (lifting) {
    cubeBody.applyForce(
      new CANNON.Vec3(0,40,0),
      cubeBody.position
    );
  }

  // Physics step
  world.step(1/60);

  // Sync mesh with physics
  cubeMesh.position.copy(cubeBody.position);
  cubeMesh.quaternion.copy(cubeBody.quaternion);

  renderer.render(scene,camera);
}

animate();

/////////////////////////
// WINDOW RESIZE
/////////////////////////

window.addEventListener("resize", () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

});