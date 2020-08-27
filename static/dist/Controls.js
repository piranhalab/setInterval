import { PointerLockControls } from './three/examples/jsm/controls/PointerLockControls.js';
import { Environment } from "./Environment.js";
import { Users } from "./Users.js";
export const Controls = {
    init: function (Scene) {
        let initialPos = Environment.initialPos;
        let initialRot = Environment.initialRot;
        Scene.camera.position.set(initialPos.x, initialPos.y, initialPos.z);
        Scene.camera.rotation.set(initialRot.x, initialRot.y, initialRot.z);
        if (detectMob()) {
            this.addMobile(Scene);
        }
        else {
            this.addDesk(Scene);
        }
        return this;
    },
    addDesk: function (Scene) {
        this.controls = new PointerLockControls(Scene.camera, document.body);
        this.rotInterval = null;
        Controls.controls.addEventListener('lock', function () {
            Controls.rotInterval = window.setInterval(function () {
                if (Controls.controls.isLocked) {
                    Users.me.rot = {
                        x: Scene.camera.rotation.x,
                        y: Scene.camera.rotation.y,
                        z: Scene.camera.rotation.z,
                    };
                }
                else {
                    window.clearInterval(Controls.rotInterval);
                }
            }, 400);
        });
        Controls.controls.addEventListener('unlock', function () {
            window.clearInterval(this.rotInterval);
        });
        document.addEventListener("click", function (e) {
            Controls.controls.lock();
        });
        window.addEventListener("moveUser", function (event) {
            let uuid = event.detail.uuid;
            let pos = event.detail.pos;
            Scene.camera.position.set(pos.x, pos.y, pos.z);
        });
    },
    addMobile: function (Scene) {
    }
};
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
