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

        this.angularK = 10;
        this.angularD = 0;
        this.angularI = 0;
        this.prevError = new CANNON.Vec3(0, 0, 0);
        this.errorSum = new CANNON.Vec3(0, 0, 0);
    }

    update() {

        const body = this.helicopter.body;

        // 🚁 LIFT
        if (this.input.isKeyDown("Space")) {
            this.helicopter.changeAltitude(0.5);
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
            // console.log("pew pew 🔫");
        }

        // 🚁 ROTATION (Z-axis)
        if (this.input.isKeyDown("KeyQ")) {
            this.helicopter.state.desiredRotation.z = Math.PI/4;
        }
        else if (this.input.isKeyDown("KeyE")) {
            this.helicopter.state.desiredRotation.z = -Math.PI/4;
        }else{
            this.helicopter.state.desiredRotation.z = 0;
        }

        this.applyControls();
    }


    angularControl() {
        let currentRotation = new CANNON.Vec3(0, 0, 0);
        this.helicopter.body.quaternion.toEuler(currentRotation)
        let error = this.helicopter.state.desiredRotation.vsub(currentRotation);
        console.log("this.helicopter.state.desiredRotation", this.helicopter.state.desiredRotation);
        
        // if (error.length() > 0.3){
        //     this.helicopter.body.angularVelocity = error.scale(this.angularK).vadd(error.vsub(this.prevError).scale(this.angularD)).vadd(this.errorSum.scale(this.angularI));
        // }

        this.helicopter.body.angularVelocity = error.scale(this.angularK).vadd(error.vsub(this.prevError).scale(this.angularD));

        this.prevError = error;
        this.errorSum.vadd(error);
    }

    linearControl() {
        let currentRotation = new CANNON.Vec3(0, 0, 0);
        this.helicopter.body.quaternion.toEuler(currentRotation)
        
        let forceMag = this.helicopter.desiredAltitude - this.helicopter.body.position.z;
        let thrustForce = new CANNON.Vec3(0, 0, forceMag);
        // console.log("currentRotation.x", currentRotation.x);
        
        let movementForce = new CANNON.Vec3(0, -50*Math.sin(currentRotation.x), 0);
        thrustForce = thrustForce.vadd(movementForce);
        // console.log("\nmovementForce", thrustForce);
        // console.log("currentRotation.x", currentRotation.x);
        
        this.helicopter.body.applyForce(
            thrustForce,
            this.helicopter.body.position
        );
    }

    applyControls() {
        this.angularControl();
        this.linearControl();
    }

}