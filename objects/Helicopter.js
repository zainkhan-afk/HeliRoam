import * as THREE from "three";

import * as CANNON from "https://cdn.skypack.dev/cannon-es";

class ObjectState{
    constructor(){
        this.desiredRotation = new THREE.Vector3(0, 0, 0);
        this.desiredPosition = new THREE.Vector3(0, 0, 0);
    }    
}

export class Helicopter {

    constructor(scene, world) {
        this.scene = scene;
        this.desiredAltitude = 50;
        this.state = new ObjectState();
        this.world = world;

        this.mesh = this.createMesh();
        this.body = this.createPhysicsBody();

        scene.add(this.mesh);
        world.addBody(this.body);

    }

    createMesh() {

      const mesh = new THREE.Group();

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(15, 15, 15),
        new THREE.MeshLambertMaterial({
          color: "white",
          flatShading: true,
        })
      );
      // body.position.z = this.desiredAltitude;
      body.castShadow = true;
      body.receiveShadow = true;

      const tail = new THREE.Mesh(
        new THREE.BoxGeometry(5, 30, 5),
        new THREE.MeshLambertMaterial({
          color: "white",
          flatShading: true,
        })
      );

      tail.position.y = -20;
      // tail.position.z = this.desiredAltitude;
      tail.castShadow = true;
      tail.receiveShadow = true;

      mesh.add(body);
      mesh.add(tail);

      // mesh.position.z = this.desiredAltitude;

      return mesh;
    }

    createPhysicsBody() {

        const shape = new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5));

        const body = new CANNON.Body({
            mass: 1,
            shape: shape,
            position: new CANNON.Vec3(0,0,0)
        });

        body.linearDamping = 0.4;

        return body;
    }

    update() {
        // sync physics → graphics
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);

    }

    hover() {
        let deltaPos = this.desiredAltitude - this.body.position.z;
        if (deltaPos > 0){
            let liftForce = 1*deltaPos;
            this.applyLift(liftForce);
        }
    }

    applyLift(force = 40) {
        this.body.applyForce(
            new CANNON.Vec3(0, 0, force),
            this.body.position
        );

    }

    changeAltitude(deltaAltitude){
        this.desiredAltitude += deltaAltitude;
    }

}