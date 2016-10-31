(function (Machete) {
    'use strict';
    const AssetManager = Machete.assetManager;
    const MusicPlayer = Machete.audio.music;
    const SceneManager = Machete.scenes;

    // Game data
    let game = Machete.init(Machete.querySelector(".machete-stage"), {
        init() {
            game.bgTiles = Machete.querySelectorAll(".background > .tile");

            let randomPulsate = () => {
                for (var i = 0; i < game.bgTiles.length; i += 1) {
                    game.bgTiles[i].classList.remove("pulsate");
                }
                for (var i = 0; i < 10; i += 1) {
                    game.bgTiles[Math.floor(Math.random() * game.bgTiles.length)].classList.add("pulsate");
                }
            };

            randomPulsate();

            let bgInterval = window.setInterval(randomPulsate, 10000);

            game.fpsMeter = new FPSMeter({
                heat: 1,
                graph: 1,
                position: "fixed"
            });
            SceneManager.registerScene("loading", {
                element: Machete.querySelector("#loading"),
                init() {},
                update() {},
                draw() {}
            });
            SceneManager.setActiveScene("loading");
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
        },
        update: delta => {
            game.fpsMeter.tick();
            SceneManager.updateScene(delta);
        },
        draw() {
            SceneManager.drawScene();
        }
    });
    game.start();
}(window.Machete));
