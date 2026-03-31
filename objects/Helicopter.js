import * as THREE from "three";

import * as CANNON from "cannon";

class ObjectState{
    constructor(){
        this.desiredRotation = new CANNON.Vec3(0, 0, 0);
        this.desiredPosition = new CANNON.Vec3(0, 0, 0);
    }    
}

export class Helicopter {

    constructor(scene, world) {
        this.scene = scene;
        this.desiredAltitude = 50;
        this.state = new ObjectState();
        this.state.desiredPosition.z = this.desiredAltitude;
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

        const shape = new CANNON.Box(new CANNON.Vec3(15,15,15));

        const body = new CANNON.Body({
            mass: 1,
            shape: shape,
            position: new CANNON.Vec3(0,0,0)
        });

        body.linearDamping = 0.4;
        body.angularDamping = 0.9;

        return body;
    }

    update() {
        // sync physics → graphics
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);

    }

    control(){
        let currentRotation = new CANNON.Vec3(0, 0, 0);
        this.body.quaternion.toEuler(currentRotation)
        
        let forceMag = this.desiredAltitude - this.body.position.z;
        let thrustForce = new CANNON.Vec3(0, 0, forceMag);
        // let movementForce = currentRotation.length()? new CANNON.Vec3(0, 100*Math.sin(currentRotation.x), 0) : new CANNON.Vec3(0, 0, 0);
        let movementForce = new CANNON.Vec3(0, -100*Math.sin(currentRotation.x), 0);
        thrustForce = thrustForce.vadd(movementForce);
        // thrustForce += movementForce;
        // console.log("\nmovementForce", movementForce);
        // console.log("currentRotation", currentRotation, currentRotation.length());
        // console.log(currentRotation.length() ? "EXISTS" : "DOES NOT EXIST")\
        
        let forcePos = new CANNON.Vec3(0, 0, 0);
        this.body.applyForce(
            thrustForce,
            this.body.position
        );


        let deltaRot = this.state.desiredRotation.vsub(currentRotation);
        this.body.angularVelocity = deltaRot;
      
    }

    // hover() {
    //     let deltaPos = this.desiredAltitude - this.body.position.z;
    //     if (deltaPos > 0){
    //         let liftForce = 1*deltaPos;
    //         this.applyLift(liftForce);
    //     }
    // }

    // applyLift(force = 40) {
    //     this.body.applyForce(
    //         new CANNON.Vec3(0, 0, force),
    //         this.body.position
    //     );

    // }

    changeAltitude(deltaAltitude){
        this.desiredAltitude += deltaAltitude;
    }

}