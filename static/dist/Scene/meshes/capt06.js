import * as THREE from "../../three/build/three.module.js";
import { GLTFLoader } from '/dist/three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from '/dist/three/examples/jsm/loaders/DRACOLoader.js';

export const capt06 = {

    init: function(Scene){

	let loader = new GLTFLoader();
	var dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath( '/js/three/examples/js/libs/draco/' );
	loader.setDRACOLoader( dracoLoader );
	
	loader.load(
	    '../3d/3zitzaflh425.gltf',
	    function ( gltf ) {
		
		let fuente = gltf.scene
		Window.fuente = fuente;
		
		fuente.scale.multiplyScalar(400)
		//fuente.material = mat; 
	    
		fuente.position.set(0, 0, 400)
		
		Scene.scene.add(fuente)
		Scene.fuente = fuente
		
		//var animations = gltf.animations;
		
		//mixer = new THREE.AnimationMixer( fuente );
		
		//var action = mixer.clipAction( animations[ 0 ] );
		//action.play();

		capt06.fuente = fuente;
		
	    })
	// this.movimiento move(fuente);
	//return fuente;
	
//	move();

    },

    destroy: function(Scene){
	//console.log(this.movimiento, this.fuente )
	//learInterval(this.movimiento)
	//this.fuente.geometry.dispose()
	//this.fuente.material.dispose()

	
	capt06.fuente.children.forEach(
	    function (hijo){
		hijo.geometry.dispose()
		hijo.material.dispose()
		Scene.scene.remove(hijo)
	    }
	)

	Scene.scene.remove(capt06.fuente); 
	
	Scene.renderer.renderLists.dispose();
    },

    movimiento: null

    
}

function move(mesh){


    //var clock;
    //clock = new THREE.Clock();
    
    function loop(){
	//var time = Date.now() * 0.0005;
	//var mixerUpdateDelta = clock.getDelta();
	//mixer.update(mixerUpdateDelta);
    }

    return setInterval(loop, 30) 

}

