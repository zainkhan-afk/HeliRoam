// controllers/HelicopterController.js

import * as CANNON from "cannon";


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

        // 🚁 ROTATION (X-axis)
        if (this.input.isKeyDown("KeyW")) {
            // body.applyForce(new CANNON.Vec3(0, 0, -this.moveForce), body.position);
            this.helicopter.state.desiredRotation.x = -Math.PI/4;
        }

        else if (this.input.isKeyDown("KeyS")) {
            // body.applyForce(new CANNON.Vec3(0, 0, this.moveForce), body.position);
            this.helicopter.state.desiredRotation.x = Math.PI/4;
        }
        else{
            this.helicopter.state.desiredRotation.x = 0;
        }

        // 🚁 ROTATION (Y-axis)
        if (this.input.isKeyDown("KeyA")) {
            this.helicopter.state.desiredRotation.y = -Math.PI/4;
        }
        else if (this.input.isKeyDown("KeyD")) {
            this.helicopter.state.desiredRotation.y = Math.PI/4;
        }else{
            this.helicopter.state.desiredRotation.y = 0;
        }
        // 🔫 SHOOT (placeholder)
        if (this.input.mouse.left) {
            console.log("pew pew 🔫");
        }

        // 🚁 ROTATION (Z-axis)
        if (this.input.isKeyDown("KeyQ")) {
            this.helicopter.state.desiredRotation.z = -Math.PI/4;
        }
        else if (this.input.isKeyDown("KeyE")) {
            this.helicopter.state.desiredRotation.z = Math.PI/4;
        }else{
            this.helicopter.state.desiredRotation.z = 0;
        }
        // 🔫 SHOOT (placeholder)
        if (this.input.mouse.left) {
            console.log("pew pew 🔫");
        }
    }

}