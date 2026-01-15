class Player{
    constructor(pos, rotation){
        this.name = "player";
        this.pos = pos;
        this.rotation = rotation;
        this.mass = 10;

        this.thrust = createVector(0, 0, 0.0011);

        this.vel = createVector(0, 0, 0);
        this.acc = createVector(0, 0, 0);

        this.omega = createVector(0, 0, 0);
        this.omegaDot = createVector(0, 0, 0);
    }

    ApplyForce(f){
        this.acc.add(p5.Vector.mult(f, 1/this.mass));
    }

    ApplyAcceleration(a){
        this.acc.add(a);
    }

    Step(dt){
        this.ApplyForce(this.thrust);
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.pos.add(p5.Vector.mult(this.vel, dt));

        this.acc.set(0);
    }

}