import createStylesheet from "create-stylesheet";

export class Tilemap {
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
            } = tilemapResource.data,
                tileSelector = `.${name} .t`,
                styleObject = {
                    [tileSelector]: {
                        width: tilewidth,
                        height: tileheight,
                        backgroundImage: `url("${image}")`,
                        display: "table-cell"
                    }
                };

            let i = 0;
            for (var row = 0; row < (imageheight / tileheight); row += 1) {
                for (var col = 0; col < (imagewidth / tilewidth); col += 1, i += 1) {
                    styleObject[`${tileSelector}-${i}`] = {
                        backgroundPosition: `${-(col * tileheight)}px ${-(row * tilewidth)}px`
                    };
                }
            }
            resolve(createStylesheet(styleObject));
        });
    }
}
