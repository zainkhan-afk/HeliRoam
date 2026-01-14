class Renderer{
    constructor(){

    }

    RenderPlayer(object){
        fill(100);
        push();
        translate(object.pos.x, object.pos.y, object.pos.z);
        rotateX(object.rotation.x);
        rotateY(object.rotation.y);
        rotateZ(object.rotation.z);
        box(100, 100, 100);
        pop();
    }

    Render(game_objects){
        for (let object of game_objects){
            if (object.name === "player"){this.RenderPlayer(object);}
        }
    }
}