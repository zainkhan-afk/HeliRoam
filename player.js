class Player{
    constructor(pos, rotation){
        this.name = "player";
        this.pos = pos;
        this.rotation = rotation;

        this.vel = createVector(0, 0, 0);
        this.acc = createVector(0, 0, 0);

        this.omega = createVector(0, 0, 0);
        this.omegaDot = createVector(0, 0, 0);
    }

    Step(dt){
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.pos.add(p5.Vector.mult(this.vel, dt));

        this.acc.set(0);
    }

}