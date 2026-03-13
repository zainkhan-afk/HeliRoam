// physics.js
import * as CANNON from "https://cdn.skypack.dev/cannon-es";

export function createPhysicsWorld() {

    const world = new CANNON.World();

    world.gravity.set(0, -9.82, 0);

    return world;

}


export function stepPhysics(world) {

    const fixedTimeStep = 1 / 60;

    world.step(fixedTimeStep);

}