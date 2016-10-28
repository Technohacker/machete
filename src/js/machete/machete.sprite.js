(function (Machete) {
    'use strict';
    Machete.extend("sprite", {
        Sprite: function (spriteElement, init, update, act) {
            let compStyle = window.getComputedStyle(spriteElement),
                coords = {
                    x: parseInt(compStyle.left, 10),
                    y: parseInt(compStyle.top, 10)
                };
            this.prevCoords = coords;
            this.currCoords = coords;

            this.spriteInit = init;
            this.spriteUpdate = update;
            this.spriteAct = act;

            this.moveBy = (delta) => {
                let coords = {
                    x: this.currCoords.x + delta.x,
                    y: this.currCoords.y + delta.y
                };
                this.setPos(coords);
            };
            this.setPos = (coords) => {
                this.currCoords = {
                    x: coords.x,
                    y: coords.y
                };
            };
            this.update = (delta) => {
                this.spriteUpdate(delta);
                this.setPos(this.currCoords);
            };
            this.act = () => {
                this.element.style.left = this.currCoords.x + "px";
                this.element.style.top = this.currCoords.y + "px";
                this.spriteAct();
            };

            this.element = spriteElement;
            this.element.classList.add("sprite");
            this.element.classList.add("gpu-accel");
            this.element.style = compStyle;

            this.spriteInit();
        },
    });
}(window.Machete));
