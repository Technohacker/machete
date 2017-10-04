import {
    Machete,
    KeyboardInput,
    PointerInput,
    RigidBodySprite,
    Game
} from "machete/index.js";

import {
    Person
} from "./sprites/person.js";

export class LittleWorld extends Game {
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

        this.keyboard = new KeyboardInput();
        this.pointer = new PointerInput();

        this.sprites = [
            new Person(this.keyboard),
            new RigidBodySprite(Machete.getDOMElement(".floor")),
            new RigidBodySprite(Machete.getDOMElement("#wall1")),
            new RigidBodySprite(Machete.getDOMElement("#wall2")),
            new RigidBodySprite(Machete.getDOMElement("#wall3"))
        ];

        this.pointer.registerListener({
            element: this.sprites[0].element,
            start: event => this.sprites[0].applyForce({
                x: 0,
                y: -0.1
            })
        });

        Matter.World.add(this.engine.world, (() => {
            let arr = [];
            this.sprites.forEach(sprite => arr.push(sprite.rigidBody));
            return arr;
        })());
    }

    update(delta) {
        this.sprites.forEach(sprite => sprite.updateSprite());
        Matter.Engine.update(this.engine, 1000 / 60);
    }

    draw() {
        this.sprites.forEach(sprite => sprite.drawSprite());
    }
}

let game = new LittleWorld();
game.start();
