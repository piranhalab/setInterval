import { Users } from "../Users.js";
import { owl } from "../Scene/meshes/owl.js";
import { stein } from "../Scene/meshes/stein.js";
import { triaxial } from "../Scene/meshes/triaxial.js";
import { capt } from "../Scene/meshes/capt.js";
import { Scene } from "../Scene.js";

export const triggerMesh = {
    //0: "background: rgb(238,174,202); background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,157,233,1) 100%);",
    meshes: {
        0: owl,
        1: stein,
        2: triaxial,
	3: capt
    },

    current: null,
    
    init: function () {
        window.addEventListener("changeUser", function (data) {
            let uuid = data.detail.uuid;
            let prop = data.detail.prop;
            let value = data.detail.value;
            if (Users[uuid].uuid != "01800-api-666")
                return;
            if (prop == "mesh") {
		if(triggerMesh.current != null){
		    console.log(value, triggerMesh.current)
			triggerMesh.meshes[triggerMesh.current].destroy(Scene)
		    }
                  
                if (triggerMesh.meshes.hasOwnProperty(value)) {
		     triggerMesh.meshes[value].init(Scene)
		    triggerMesh.current = value
                }
            }
        });
	
        window.addEventListener("addUser", function (data) {
            let uuid = data.detail.uuid;
            if (Users[uuid].uuid != "01800-api-666") {
                return false;
            }
            // document.body.style.backgroundImage = bgGradient.grads[Users[uuid].props.bg];
        });
    }
};
