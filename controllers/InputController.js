// controllers/InputController.js

export class InputController {

    constructor() {
        this.keys = {};
        this.mouse = {
            left: false
        };

        this.initListeners();
    }

    initListeners() {

        // keyboard
        window.addEventListener("keydown", (e) => {
            this.keys[e.code] = true;
        });

        window.addEventListener("keyup", (e) => {
            this.keys[e.code] = false;
        });

        // mouse
        window.addEventListener("mousedown", () => {
            this.mouse.left = true;
        });

        window.addEventListener("mouseup", () => {
            this.mouse.left = false;
        });
    }

    // helpers (makes code cleaner later)
    isKeyDown(key) {
        return this.keys[key];
    }

}