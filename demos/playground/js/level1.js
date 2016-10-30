(function (Machete) {
    'use strict';
    const SceneManager = Machete.scenes;

    SceneManager.registerScene("level1", {
        element: Machete.querySelector("#level1"),
        player: window.Player,
        init() {

        },
        update(delta) {
            this.player.update(delta);
        },
        draw() {
            this.player.act();
        }
    });
}(window.Machete));
