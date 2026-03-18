import * as THREE from "three";
import * as CANNON from "https://cdn.skypack.dev/cannon-es";

export class Helicopter {

    constructor(scene, world) {

        this.scene = scene;
        this.world = world;

        this.mesh = this.createMesh();
        this.body = this.createPhysicsBody();

        scene.add(this.mesh);
        world.addBody(this.body);

        this.desiredAltitude = 0;
    }

    createMesh() {

        const geometry = new THREE.BoxGeometry(1, 1, 1);

        const material = new THREE.MeshStandardMaterial({
            color: 0x00ff00
        });

        const mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }

    createPhysicsBody() {

        const shape = new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5));

        const body = new CANNON.Body({
            mass: 1,
            shape: shape,
            position: new CANNON.Vec3(0,5,0)
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
        let deltaPos = this.desiredAltitude - this.body.position.y;
        if (deltaPos > 0){
            let liftForce = 20*deltaPos;
            this.applyLift(liftForce);
        }
    }

    applyLift(force = 40) {

        this.body.applyForce(
            new CANNON.Vec3(0, force, 0),
            this.body.position
        );

    }

    changeAltitude(deltaAltitude){
        this.desiredAltitude += deltaAltitude;
    }

}