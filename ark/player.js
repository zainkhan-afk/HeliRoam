class Player{
    constructor(pos, rotation){
        this.name = "player";
        this.pos = pos;
        this.rotation = rotation;
        this.phi = 0;
        this.mass = 10;

        this.thrust = createVector(0, 0, 0);
        this.maxThrust = 120;

        this.vel = createVector(0, 0, 0);
        this.acc = createVector(0, 0, 0);

        this.omega = createVector(0, 0, 0);
        this.omegaDot = createVector(0, 0, 0);

        this.offset = 0;
    }

    ApplyForce(f){
        this.acc.add(p5.Vector.mult(f, 1/this.mass));
    }

    ApplyAcceleration(a){
        this.acc.add(a);
    }

    CalculateThrust(){
        // let thrustVal = map(sin(this.offset), -1, 1, this.maxThrust, this.maxThrust*1.5);
        let thrustVal = map(sin(this.offset), -1, 1, this.maxThrust*0.5, this.maxThrust);
        let z = thrustVal*cos(this.phi);
        let p = thrustVal*sin(this.phi);
        let x = p*cos(this.rotation);
        let y = p*sin(this.rotation);
        this.thrust.set(x, y, z);
        this.offset += 0.01;
    }

    Step(dt){
        this.CalculateThrust();
        // this.thrust.set(p5.Vector.fromAngle(-PI, this.maxThrust));
        // this.thrust.setMag(this.maxThrust);
        console.log(this.thrust);
        this.ApplyForce(this.thrust);
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.pos.add(p5.Vector.mult(this.vel, dt));

        this.acc.set(0);
    }

}