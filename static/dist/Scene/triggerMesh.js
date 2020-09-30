import { Users } from "../Users.js";
import { owl } from "../Scene/meshes/owl.js";
import { owlAnim } from "../Scene/meshes/owlAnim.js";
import { owlReact } from "../Scene/meshes/owlReact.js";
import { stein } from "../Scene/meshes/stein.js";
import { steinAnim } from "../Scene/meshes/steinAnim.js";
import { steinReact } from "../Scene/meshes/steinReact.js";
import { triaxial } from "../Scene/meshes/triaxial.js";
import { triaxialAnim } from "../Scene/meshes/triaxialAnim.js";
import { triaxialReact } from "../Scene/meshes/triaxialReact.js";
import { capt } from "../Scene/meshes/capt.js";
import { exporter } from "../Scene/meshes/exporter.js";
//import { mElement } from "../Scene/meshes/mElement.js"; 
import { Scene } from "../Scene.js";

export const triggerMesh = {
    //0: "background: rgb(238,174,202); background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,157,233,1) 100%);",
    meshes: {

	/*
	0: {init: function(Scene){}, destroy: function(Scene){}, },
	1: owl,
        2: stein,
        3: triaxial,
	4: capt,
	5: owlAnim,
	6: steinAnim,
	7: triaxialAnim,
	8: owlReact,
	9: steinReact,
	10: triaxialReact
	*/
	
	0: {init: function(Scene){}, destroy: function(Scene){}, },
	1: owl,
	2: owlAnim,
	3: owlReact,
	4: stein,
	5: steinAnim,
	6: steinReact,
	7: triaxial,
	8: triaxialAnim,
	9: triaxialReact,
	10: capt,
	// 11: exporter 
	
    },

    current: null,
    
    init: function () {
        window.addEventListener("changeUser", function (data) {
	     console.log("holooooO"); 
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
	    console.log("holooooO"); 
            // let uuid = data.detail.uuid;
	    let uuid = data.detail.uuid;

            if (Users[uuid].uuid != "01800-api-666") {
                return false;
            }
	    let value = Users[uuid].mesh;
	    // console.log("holaaa", prop, value); 
            // document.body.style.backgroundImage = bgGradient.grads[Users[uuid].props.bg];
		if(triggerMesh.current != null){
		    console.log(value, triggerMesh.current)
			triggerMesh.meshes[triggerMesh.current].destroy(Scene)
		    }
                  
                if (triggerMesh.meshes.hasOwnProperty(value)) {
		     triggerMesh.meshes[value].init(Scene)
		    triggerMesh.current = value
                }
            

        });
    }
};
