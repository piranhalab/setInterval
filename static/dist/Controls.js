import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js';
import * as THREE from './three/build/three.module.js';
import { Environment } from "./Environment.js";
import { Users } from "./Users.js";
export const Controls = {
    init: function (Scene) {
        let initialPos = Environment.initialPos;
        let initialRot = Environment.initialRot;
        Scene.camera.position.set(initialPos.x, initialPos.y, initialPos.z);
        Scene.camera.rotation.set(initialRot.x, initialRot.y, initialRot.z);
        this.controls = new OrbitControls(Scene.camera, Scene.renderer.domElement);
        this.orbit = function () {
            Controls.controls.update();
            requestAnimationFrame(Controls.orbit);
        };
        requestAnimationFrame(this.orbit);
        setInterval(function () {
            Users.me.pos = {
                x: Scene.camera.position.x,
                y: Scene.camera.position.y,
                z: Scene.camera.position.z,
            };
        }, 100);
        /*
                if(detectMob()) {
                    this.addMobile(Scene)
                }else{
                    this.addDesk(Scene)
                }
                   */
        return this;
    },
    addDesk: function (Scene) {
        this.controls = new PointerLockControls(Scene.camera, document.body);
        this.rotInterval = null;
        this.direction = new THREE.Vector3();
        this.moveForward = false;
        this.moveBackward = false;
        this.moveRight = false;
        this.moveLeft = false;
        this.vel = 0.3;
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
        let updatePos = null;
        this.move = function () {
            Controls.direction.z = Number(Controls.moveForward) - Number(Controls.moveBackward);
            Controls.direction.x = Number(Controls.moveRight) - Number(Controls.moveLeft);
            if (Controls.direction.z != 0 || Controls.direction.x != 0) {
                Controls.controls.moveForward(Controls.direction.z * Controls.vel);
                Controls.controls.moveRight(Controls.direction.x * Controls.vel);
                if (!updatePos) {
                    updatePos = setInterval(function () {
                        Users.me.pos = {
                            x: Scene.camera.position.x,
                            y: Scene.camera.position.y,
                            z: Scene.camera.position.z,
                        };
                    }, 400);
                }
            }
            else {
                Users.me.pos = {
                    x: Scene.camera.position.x,
                    y: Scene.camera.position.y,
                    z: Scene.camera.position.z,
                };
                if (updatePos)
                    clearInterval(updatePos);
                updatePos = null;
            }
            requestAnimationFrame(Controls.move);
        };
        this.updatePos = function () {
        };
        Controls.controls.addEventListener('unlock', function () {
            window.clearInterval(this.rotInterval);
        });
        let lockfunc = function (e) {
            Controls.controls.lock();
        };
        document.querySelector("canvas").addEventListener("click", lockfunc, false);
        document.querySelectorAll(".blank").forEach(function (e) {
            e.addEventListener("click", lockfunc, false);
        });
        window.addEventListener("addUser", function (event) {
            let uuid = event.detail.uuid;
            if (uuid == "me")
                requestAnimationFrame(Controls.move);
        });
        window.addEventListener("moveUser", function (event) {
            let uuid = event.detail.uuid;
            let pos = event.detail.pos;
            if (uuid == "me")
                Scene.camera.position.set(pos.x, pos.y, pos.z);
        });
        window.addEventListener("keydown", function (event) {
            if (Controls.controls.isLocked == false)
                return;
            if (document.activeElement != document.body)
                return;
            switch (event.key) {
                case "w":
                case "W":
                    Controls.moveForward = true;
                    break;
                case "s":
                case "S":
                    Controls.moveBackward = true;
                    break;
                case "a":
                case "A":
                    Controls.moveLeft = true;
                    break;
                case "d":
                case "D":
                    Controls.moveRight = true;
                    break;
            }
        });
        window.addEventListener("keyup", function (event) {
            switch (event.key) {
                case "w":
                case "W":
                    Controls.moveForward = false;
                    break;
                case "s":
                case "S":
                    Controls.moveBackward = false;
                    break;
                case "a":
                case "A":
                    Controls.moveLeft = false;
                    break;
                case "d":
                case "D":
                    Controls.moveRight = false;
                    break;
            }
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
