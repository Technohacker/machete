import {
    Machete,
    KeyboardInput,
    MouseInput,
    RigidBodySprite,
    Game
} from "machete/index.js";

import {
    Person
} from "./sprites/person.js";

export class LittleWorld extends Game {
    constructor() {
        super(Machete.getDOMElement(".machete-stage"));
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
        this.mouse = new MouseInput();

        this.sprites = [
            new Person(this.keyboard),
            new RigidBodySprite(Machete.getDOMElement(".floor"))
        ];

        this.mouse.registerListener({
            element: this.sprites[0].element,
            mousedown: event => this.sprites[0].applyForce({
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
