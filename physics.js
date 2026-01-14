class Physics{
    constructor(){}

    Step(dt, game_objects){
        for (let object of game_objects){
            object.Step(dt);
        }
    }
}