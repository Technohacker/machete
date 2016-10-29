(function (window, document, Machete, AssetManager, MusicPlayer) {
    'use strict';
    // Game data
    let game = Machete.init(document.querySelector(".machete-stage"));

    // Game methods
    game.init = (() => {
        game.scenes = {
            loading: document.querySelector("#loading"),
            mainMenu: document.querySelector("#main-menu")
        };
        AssetManager.init([{
                type: "audio",
                name: "bgAudio1",
                href: "audio/SANDRSomethingNew.mp3"
            }])
            .start()
            .then(() => {
                game.assetCache = {
                    bgAudio1: AssetManager.get("bgAudio1")
                };
                MusicPlayer.init([{
                    source: game.assetCache.bgAudio1,
                    speed: 1.0
                }]);
                MusicPlayer.play(false);
                // BUG: VERY crude method of screen changing. FIX IMMEDIATELY!
                game.scenes.loading.classList.remove("active");
                game.scenes.mainMenu.classList.add("active");
            });

        //game.player = window.Player;
        game.fpsMeter = new FPSMeter({
            heat: 1,
            graph: 1,
            position: "fixed"
        });
    });

    game.update = (delta => {
        game.fpsMeter.tick();
        //game.player.update(delta);
    });

    game.draw = (delta => {
        //game.player.act();
    });

    game.start();
}(window, window.document, window.Machete, window.Machete.assetManager, window.Machete.audio.music));
