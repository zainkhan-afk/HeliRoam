let heliroam;

function setup() 
{
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    heliroam = new HeliRoam();
    frameRate(60);
}

function draw()
{
    // clear();
    background(200);
    fill(0);
    console.log("FPS: " + str(round(frameRate(), 1)));
    heliroam.Step();
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}