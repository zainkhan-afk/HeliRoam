function setup() 
{
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
}

function draw()
{
    clear();
    background(200);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}