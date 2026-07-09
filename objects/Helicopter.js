import * as THREE from "three";

import * as CANNON from "cannon";

class ObjectState{
    constructor(){
        this.angularVelocity = new CANNON.Vec3(0, 0, 0);
        this.rotation = new CANNON.Vec3(0, 0, 0);
        this.linearVelocity = new CANNON.Vec3(0, 0, 0);
        this.position = new CANNON.Vec3(0, 0, 0);
    }    
}

export class Helicopter {

    constructor(scene, world) {
        this.scene = scene;
        this.desiredAltitude = 50;
        
        this.state = new ObjectState();
        this.desiredState = new ObjectState();
        
        this.desiredState.position.z = this.desiredAltitude;
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
        // body.angularDamping = 0.9;

        return body;
    }

    update() {
        // sync physics → graphics
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);

        this.state.position.copy(this.body.position);
        this.body.quaternion.toEuler(this.state.rotation);
        this.state.linearVelocity.copy(this.body.velocity);
        this.state.angularVelocity.copy(this.body.angularVelocity);
    }

    control(){        
        // let forceMag = this.desiredAltitude - this.body.position.z;
        // let thrustForce = new CANNON.Vec3(0, 0, forceMag);
        // // let movementForce = currentRotation.length()? new CANNON.Vec3(0, 100*Math.sin(currentRotation.x), 0) : new CANNON.Vec3(0, 0, 0);
        // let movementForce = new CANNON.Vec3(0, -50*Math.sin(this.state.rotation.x), 0);
        // thrustForce = thrustForce.vadd(movementForce);
        
        // console.log("currentRotation.x", this.state.rotation.x);
        // // console.log("\nmovementForce", movementForce);
        // // console.log("currentRotation", currentRotation, currentRotation.length());
        // // console.log(currentRotation.length() ? "EXISTS" : "DOES NOT EXIST")\
        
        // let forcePos = new CANNON.Vec3(0, 0, 0);
        // this.body.applyForce(
        //     thrustForce,
        //     this.body.position
        // );


        // let deltaRot = this.state.rotation.vsub(this.desiredState.rotation);
        // this.body.angularVelocity = deltaRot;
      
    }

    changeAltitude(deltaAltitude){
        this.desiredAltitude += deltaAltitude;
    }

}