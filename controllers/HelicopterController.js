// controllers/HelicopterController.js

import * as CANNON from "https://cdn.skypack.dev/cannon-es";

export class HelicopterController {

    constructor(helicopter, input) {
        this.helicopter = helicopter;
        this.input = input;

        // tweak these values for feel
        this.liftForce = 40;
        this.moveForce = 1;
        this.turnTorque = 5;
    }

    update() {

        const body = this.helicopter.body;

        // 🚁 LIFT
        if (this.input.isKeyDown("Space")) {
            // this.helicopter.applyLift(this.liftForce);
            this.helicopter.changeAltitude(0.05);
        }
        else{
            
        }

        // 🚁 FORWARD / BACKWARD
        if (this.input.isKeyDown("KeyW")) {
            body.applyForce(new CANNON.Vec3(0, 0, -this.moveForce), body.position);
        }

        if (this.input.isKeyDown("KeyS")) {
            body.applyForce(new CANNON.Vec3(0, 0, this.moveForce), body.position);
        }

        // 🚁 ROTATION (Y-axis)
        if (this.input.isKeyDown("KeyA")) {
            body.angularVelocity.y += this.turnTorque * 0.01;
        }

        if (this.input.isKeyDown("KeyD")) {
            body.angularVelocity.y -= this.turnTorque * 0.01;
        }

        // 🔫 SHOOT (placeholder)
        if (this.input.mouse.left) {
            console.log("pew pew 🔫");
        }
    }

}