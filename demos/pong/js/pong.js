import {
    Machete,
    Game,
    KeyboardManager,
    Sprite
} from "machete/index.js";

import {
    Ball
} from "./Ball.js";

export class Pong extends Game {
    constructor() {
        super(Machete.getDOMElement(".machete-stage"));
    }

    init() {
        this.keyboard = new KeyboardManager();

        this.paddle = new Sprite(Machete.getDOMElement("#player"));
        this.ball = new Ball(Machete.getDOMElement(".ball"));
        this.ball.setDelta({x: -10, y: -10});

        this.keyboard.registerListener({
            code: "ArrowUp",
            down: event => {
                this.paddle.moveBy({
                    x: 0,
                    y: -10
                });
            },
            up: event => { }
        });
        this.keyboard.registerListener({
            code: "ArrowDown",
            down: event => {
                this.paddle.moveBy({
                    x: 0,
                    y: 10
                });
            },
            up: event => { }
        });
    }

    update(delta) {
        this.ball.updateSprite();
    }

    draw() {
        this.paddle.drawSprite();
        this.ball.drawSprite();
    }
}

let play = document.querySelector("#play");
play.addEventListener("click", event => {
    let game = new Pong();
    game.start();
    play.parentNode.removeChild(play);
});
