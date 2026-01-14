class HeliRoam{
    constructor(){
        this.dt = 0.01;
        this.physics = new Physics();
        this.renderer = new Renderer();

        this.gameObjects = [new Player(createVector(0, 0, 100), createVector(0, 0, 0))];
    }


    Step(){
        this.physics.Step(deltaTime, this.gameObjects);
        this.renderer.Render(this.gameObjects);
    }
}