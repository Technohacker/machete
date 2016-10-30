(function (Machete, Matter) {
    'use strict';
    const SceneManager = Machete.scenes;
    const Engine = Matter.Engine;
    const World = Matter.World;

    SceneManager.registerScene("level1", {
        element: Machete.querySelector("#level1"),
        init() {
            window.boxA = window.Matter.Bodies.rectangle(400, 200, 80, 80);
            window.ground = window.Matter.Bodies.rectangle(400, 610, 810, 60, {
                isStatic: true
            });

            window.Matter.Body.set(window.boxA, "element", document.querySelector("#player"));
            window.Matter.Body.set(window.ground, "element", document.querySelector("#ground"));


            this.engine = Engine.create();
            World.add(this.engine.world, [window.boxA, window.ground]);
        },
        update(delta) {
            Engine.update(this.engine, delta);
        },
        draw() {
            Matter.DOM.render(this.engine);
        }
    });
}(window.Machete, window.Matter));
