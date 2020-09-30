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

import { capt00 } from "../Scene/meshes/capt00.js";
import { capt01 } from "../Scene/meshes/capt01.js";
import { capt02 } from "../Scene/meshes/capt02.js";
import { capt03 } from "../Scene/meshes/capt03.js";
import { capt04 } from "../Scene/meshes/capt04.js";
import { capt05 } from "../Scene/meshes/capt05.js";
import { capt06 } from "../Scene/meshes/capt06.js";
import { capt07 } from "../Scene/meshes/capt07.js";

import { capt08 } from "../Scene/meshes/capt08.js";
import { capt09 } from "../Scene/meshes/capt09.js";
import { capt10 } from "../Scene/meshes/capt10.js";
import { capt11 } from "../Scene/meshes/capt11.js";
import { capt12 } from "../Scene/meshes/capt12.js";
import { capt13 } from "../Scene/meshes/capt13.js";
import { capt14 } from "../Scene/meshes/capt14.js";
import { capt15 } from "../Scene/meshes/capt15.js";

import { capt16 } from "../Scene/meshes/capt16.js";
import { capt17 } from "../Scene/meshes/capt17.js";
import { capt18 } from "../Scene/meshes/capt18.js";
import { capt19 } from "../Scene/meshes/capt19.js";
import { capt20 } from "../Scene/meshes/capt20.js";
import { capt21 } from "../Scene/meshes/capt21.js";
import { capt22 } from "../Scene/meshes/capt22.js";
import { capt23 } from "../Scene/meshes/capt23.js";
import { capt24 } from "../Scene/meshes/capt24.js";
import { capt25 } from "../Scene/meshes/capt25.js";
import { capt26 } from "../Scene/meshes/capt26.js";
// import { capt27 } from "../Scene/meshes/capt27.js";
import { capt28 } from "../Scene/meshes/capt28.js";
import { capt29 } from "../Scene/meshes/capt29.js";
import { capt30 } from "../Scene/meshes/capt30.js";

import { capt31 } from "../Scene/meshes/capt31.js";
import { capt32 } from "../Scene/meshes/capt32.js";
import { capt33 } from "../Scene/meshes/capt33.js";
import { capt34 } from "../Scene/meshes/capt34.js";
import { capt35 } from "../Scene/meshes/capt35.js";
import { capt36 } from "../Scene/meshes/capt36.js";
import { capt37 } from "../Scene/meshes/capt37.js";
import { capt38 } from "../Scene/meshes/capt38.js";

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
	10: capt00,
	11: capt01,
	12: capt02,
	13: capt03,
	14: capt04,
	15: capt05,
	16: capt06,
	17: capt07,
	18: capt08,
	19: capt09,
	20: capt10,
	21: capt11,
	22: capt12,
	23: capt13,
	24: capt14,
	25: capt15,
	26: capt16,
	27: capt17,
	28: capt18,
	29: capt19,
	30: capt20,
	31: capt21,
	32: capt22,
	33: capt23,
	34: capt24,
	35: capt26,
	37: capt26,
	38: capt28,
	39: capt29,
	40: capt30,
	41: capt31,
	42: capt32,
	43: capt33,
	44: capt34,
	45: capt35,
	46: capt36,
	47: capt37,
	48: capt38
	
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
