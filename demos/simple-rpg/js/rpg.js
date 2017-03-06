import {
    Game,
    SceneManager,
    ResourceManager,
    Tilemap
} from "../../src/es6";

export class SimpleRPG extends Game {
    init() {
        this.resourceManager = new ResourceManager([{
            type: "tilemap",
            href: "data/tilemaps/hyptosis_tile-art-batch-1.json",
            name: "tilemap1"
        }]);
        this.sceneManager = new SceneManager();
        this.sceneManager.registerScene("loading", {
            element: document.querySelector(".machete-stage"),
            init() {},
            update() {},
            draw() {}
        });
        this.resourceManager.start().then(() => {
            Tilemap.generateTilemapStyles(this.resourceManager.getAsset("tilemap1")).then(tilemapStyle => {
                document.body.appendNode(tilemapStyle);

            });
        });
    }

    update(delta) {
        this.sceneManager.updateScene(delta);
    }

    draw() {
        this.sceneManager.drawScene();
    }
}
