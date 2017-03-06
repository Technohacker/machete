import createStylesheet from "create-stylesheet";

export default class Tilemap {
    static generateTilemapStyles(tilemapResource) {
        return new Promise((resolve, reject) => {
            let {
                name,
                tilewidth,
                tileheight,
                image,
                imagewidth,
                imageheight,
                margin
            } = this.tilemapResource,
                tileSelector = `.${name} .tile`,
                styleObject = {
                    `.${name} .tile`: {
                        width: tilewidth,
                        height: tileheight,
                        backgroundImage: `url("${image}")"`
                    }
                };

            for (var row = 0; row < imageheight; row += 1) {
                for (var col = 0; col < imagewidth; col += 1) {
                    this.styleObject[`${tileSelector}.${row + col}`] = {
                        backgroundPosition: `${row * tileheight - margin}px ${col * tilewidth}px`
                    };
                }
            }
            resolve(createStylesheet(styleObject));
        });
    }
}
