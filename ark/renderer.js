class Renderer{
    constructor(){

    }

    RenderPlayer(object){
        orbitControl();
        fill(100);
        push();
        translate(object.pos.x, object.pos.y, object.pos.z);
        rotateX(object.rotation.x);
        rotateY(object.rotation.y);
        rotateZ(object.rotation.z);
        box(10, 10, 10);
        pop();
    }

    RenderGround(){
        fill(50, 50, 0);
        plane(5000);
    }

    Render(game_objects){
        this.RenderGround();
        for (let object of game_objects){
            if (object.name === "player"){this.RenderPlayer(object);}
        }
    }
}