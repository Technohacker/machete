import {
    Machete,
    KeyboardInput,
    PointerInput,
    RigidBodySprite,
    Game
} from "machete/index.js";

import {
    Cannon
} from "./sprites/cannon.js";

export class CannonLaunch extends Game {
    constructor() {
        let stage = Machete.getDOMElement(".machete-stage");
        super(stage);
        this.engine = Matter.Engine.create({
            world: Matter.World.create({
                gravity: {
                    x: 0,
                    y: 1,
                    scale: 0.001
                }
            })
        });

        this.pointer = new PointerInput();

        this.sprites = [
            new Cannon(this.pointer, this.engine.world),
            new RigidBodySprite(Machete.getDOMElement(".floor"), this.engine.world),
            new RigidBodySprite(Machete.getDOMElement("#wall1"), this.engine.world),
            new RigidBodySprite(Machete.getDOMElement("#wall2"), this.engine.world),
            new RigidBodySprite(Machete.getDOMElement("#wall3"), this.engine.world)
        ];

        Matter.World.add(this.engine.world, (() => {
            let arr = [];
            this.sprites.forEach(sprite => arr.push(sprite.rigidBody));
            return arr;
        })());
        stage.removeChild(document.querySelector("#loading"));
        document.querySelector(".controls").style.display = "block";
    }

    update(delta) {
        this.sprites.forEach(sprite => sprite.updateSprite());
        Matter.Engine.update(this.engine, 1000 / 60);
    }

    draw() {
        this.sprites.forEach(sprite => sprite.drawSprite());
    }
}

console.log("Pre Init");
let game = new CannonLaunch();
game.start();
console.log("Post Start");
