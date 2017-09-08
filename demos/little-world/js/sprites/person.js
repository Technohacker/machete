import {
    Machete,
    RigidBodySprite
} from "machete/index.js";

export class Person extends RigidBodySprite {
    constructor(keyboardManager) {
        super(Machete.getDOMElement(".person"));
        keyboardManager.registerListener({
            code: "ArrowUp",
            down: event => this.applyForce({
                x: 0,
                y: -0.1
            }),
            up: event => {}
        });
        keyboardManager.registerListener({
            code: "ArrowDown",
            down: event => this.applyForce({
                x: 0,
                y: 0.1
            }),
            up: event => {}
        });
        keyboardManager.registerListener({
            code: "ArrowLeft",
            down: event => this.applyForce({
                x: -0.1,
                y: 0
            }),
            up: event => {}
        });
        keyboardManager.registerListener({
            code: "ArrowRight",
            down: event => this.applyForce({
                x: 0.1,
                y: 0
            }),
            up: event => {}
        });
    }
}
