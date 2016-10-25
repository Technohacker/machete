(function (document, Machete) {
    'use strict';
    // Game data
    let game = Machete.init(document.querySelector(".machete-stage"));

    // Game methods
    game.init = (() => {
        game.player = new Player(document.querySelector("#player"));
        game.fpsMeter = new FPSMeter({
            heat: 1,
            graph: 1,
            position: "fixed"
        });
    });

    game.update = (delta => {
        game.fpsMeter.tick();
        game.player.update(delta);
    });

    game.draw = (delta => {
        game.player.act();
    });

    game.start();
}(window.document, window.Machete));
