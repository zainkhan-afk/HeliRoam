import * as THREE from "three";

export const ground = Ground();

function Ground() {
  const ground = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000, 10, 10),
    new THREE.MeshLambertMaterial({
      color: 0xa08000,
      flatShading: true,
    })
  );
  
  body.receiveShadow = true;
  ground.add(body);
  return ground;
}