(function (window, document, Machete, AssetManager, MusicPlayer, Sprite) {
    'use strict';
    // Game data
    let game = Machete.init(document.querySelector(".machete-stage"));

    // Game methods
    game.init = (() => {
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
                    }])
                    .play(true);
            });

        game.player = window.Player;
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
}(window, window.document, window.Machete, window.Machete.assetManager, window.Machete.audio.music));
