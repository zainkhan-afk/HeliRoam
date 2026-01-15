class HeliRoam{
    constructor(){
        this.dt = 0.01;
        this.physics = new Physics();
        this.renderer = new Renderer();

        this.gameObjects = [new Player(createVector(0, 0, 30), createVector(0, 0, 0))];
        this.cam = createCamera();

        this.AdjustCamera();
    }


    Step(){
        this.physics.Step(deltaTime/1000, this.gameObjects);
        this.renderer.Render(this.gameObjects);
    }

    AdjustCamera(){
        this.cam = createCamera();
        this.cam.camera(100, 100, 40, 
                    0, 0, 0, 
                    0, 0, -1);
        // setCamera(this.cam);
    }
}