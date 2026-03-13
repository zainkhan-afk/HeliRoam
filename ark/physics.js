class Physics{
    constructor(){
        this.gravity = createVector(0, 0, -10);
    }

    Step(dt, game_objects){
        for (let object of game_objects){
            object.ApplyAcceleration(this.gravity);
            object.Step(dt);
        }
    }
}