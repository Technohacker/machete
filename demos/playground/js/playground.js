(function (window, document, Machete, AssetManager, MusicPlayer, SceneManager) {
    'use strict';
    // Game data
    let game = Machete.init(document.querySelector(".machete-stage"));

    // Game methods
    game.init = (() => {
        // Way to randomly apply the pulsation effect
        game.bgTiles = document.querySelectorAll(".background > .tile");

        let randomPulsate = () => {
            for (var i = 0; i < game.bgTiles.length; i += 1) {
                game.bgTiles[i].classList.remove("pulsate");
            }
            for (var i = 0; i < 20; i += 1) {
                game.bgTiles[Math.floor(Math.random() * game.bgTiles.length)].classList.add("pulsate");
            }
        };

        randomPulsate();

        window.setInterval(randomPulsate, 10000);

        game.fpsMeter = new FPSMeter({
            heat: 1,
            graph: 1,
            position: "fixed"
        });
        SceneManager.init({
            loading: document.querySelector("#loading"),
            mainMenu: document.querySelector("#main-menu")
        }, "loading");
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

                //TODO: Simulated delay for testing, remove on release
                window.setTimeout(() => SceneManager.setActiveScene("mainMenu"), 1000);
            });
    });

    game.update = (delta => game.fpsMeter.tick());

    game.draw = (delta => {});

    game.start();
}(window,
    window.document,
    window.Machete,
    window.Machete.assetManager,
    window.Machete.audio.music,
    window.Machete.scenes
));
