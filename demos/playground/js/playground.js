(function (document, Machete) {
    'use strict';
    // Game data
    let game = Machete.init(document.querySelector(".machete-stage"));

    // Game methods
    game.init = (() => {
        Machete.fpsCounter.init(document.querySelector("#fps"));

        game.player = document.querySelector("#player");

        let keyCodes = Machete.inputManager.keyCodes;

        Machete.inputManager.addListener("keypress", event => {
            switch (event.which) {
            case keyCodes.LEFT:
                game.player
                break;
            default:

            }
        });
    });

    game.update = (delta => {

    });

    game.draw = (delta => {
        Machete.fpsCounter.tick(delta);
    });

    game.start();
}(window.document, window.Machete));
