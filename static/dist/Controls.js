import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js';
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
	    window.addEventListener("addUser",function(e){
		    console.info(e.detail.uuid,"AAAAA")
		    if(e.detail.uuid== "me" || e.detail.uuid== "01800-api-666"){

		    requestAnimationFrame(Controls.orbit);
			setInterval(function () {
			    Users.me.pos = {
				x: Scene.camera.position.x,
				y: Scene.camera.position.y,
				z: Scene.camera.position.z,
			    };
			}, 100);
		    }
	    })
        /*
                if(detectMob()) {
                    this.addMobile(Scene)
                }else{
                    this.addDesk(Scene)
                }
                   */
        return this;
    },
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
