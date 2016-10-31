(function (Machete) {
    'use strict';
    const SceneManager = Machete.scenes;
    SceneManager.registerScene("mainMenu", {
        element: Machete.querySelector("#main-menu"),
        playButton: Machete.querySelector("#play"),
        init() {
            this.playButton.addEventListener("mousedown", event => SceneManager.setActiveScene("level1"));
        },
        update(delta) {

        },
        draw() {

        }
    });
}(window.Machete));
