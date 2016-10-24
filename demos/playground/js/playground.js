(function (document, Machete) {
    'use strict';
    let game = Machete.init(document.querySelector(".machete-stage"));

    // Game methods
    game.init = (() => {
        // Game data
        game.fps = {
            elem: document.querySelector("#fps"),
            currFps: 0,
        };
        game.timer = {
            elapsed: 0
        };

        Machete.assetManager.init([{
            type: "image",
            name: "bg",
            href: "https://static.pexels.com/photos/158658/bokeh-blur-blue-white-158658.jpeg"
        }]);

        Machete.assetManager.start()
            .then(getAsset => {
                game.assets = {
                    bg: getAsset("bg")
                };
            });
    });

    game.update = (delta => {
        if (game.timer.elapsed > 100) {
            game.timer.elapsed = 0;
            game.fps.currFps = parseInt(1000 / delta, 10);
        }
        game.timer.elapsed += delta;
    });

    game.draw = (delta => {
        game.fps.elem.innerHTML = game.fps.currFps;
    });

    game.start();
}(window.document, window.Machete));
