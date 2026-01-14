let heliroam;

function setup() 
{
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    heliroam = new HeliRoam();
}

function draw()
{
    // clear();
    background(200);
    heliroam.Step();
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}