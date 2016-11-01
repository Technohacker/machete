(function (window) {
    'use strict';
    const Machete = window.Machete;
    const Bodies = window.Matter.Bodies;
    const Body = window.Matter.Body;

    Machete.extend("sprite", {
        Sprite: function (spriteElement, init, update, act, physics) {

            this.spriteInit = init;
            this.spriteUpdate = update;
            this.spriteAct = act;

            this.rigidBody = Bodies.rectangle(
                physics.x,
                physics.y,
                physics.width,
                physics.height,
                physics.options
            );

            Body.set(this.rigidBody, "element", spriteElement);
            Body.set(this.rigidBody, "width", physics.width);
            Body.set(this.rigidBody, "height", physics.height);


            this.applyForce = (force) => {
                Body.applyForce(this.rigidBody, {
                    x: this.rigidBody.position.x,
                    y: this.rigidBody.position.y
                }, force);
            }

            this.update = (delta) => {
                this.spriteUpdate(delta);
            };
            this.act = () => {
                this.spriteAct();
            };
            this.spriteInit();
        },
    });
}(window));
