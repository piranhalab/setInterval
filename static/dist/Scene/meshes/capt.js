import * as THREE from "../../three/build/three.module.js";
import { GLTFLoader } from '/dist/three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from '/dist/three/examples/jsm/loaders/DRACOLoader.js';

export const addCapt = function (Scene) {

    move();
    
}

function move(mesh){

    var mixer; 

    let loader = new GLTFLoader();

    var dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/js/three/examples/js/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );
    
    loader.load(
	// resource URL
	'../3d/mod4.gltf',
	// called when the resource is loadedi
	function ( gltf ) {

	    // let mat = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 0.8, roughness: 0.9, side: THREE.DoubleSide } );
	    //mat.castShadow = true
	    // gltf.scene.children[0].material = mat
// 	    console.log(gltf.animations); 

	    /*
	    var mat = new THREE.MeshStandardMaterial( {
		color: 0xffffff,
		metalness: 0.7,
		roughness: 0.15,
		// transparent: true,
		//opacity: 0.7, 
		// map: vueltasTexture,
				// side: THREE.DoubleSide
	    } );
	    mat.castShadow = true
	    gltf.scene.material = mat
	    */
	    
	    let fuente = gltf.scene
	    Window.fuente = fuente;

	    fuente.scale.multiplyScalar(20)
	    //fuente.material = mat; 
	    
	    fuente.position.set(0, 10, 40)

	    Scene.scene.add(fuente)
	    Scene.fuente = fuente

	    var animations = gltf.animations;

	    mixer = new THREE.AnimationMixer( fuente );
	    
	    var action = mixer.clipAction( animations[ 0 ] );
	    action.play(); 
	})

    var clock;
    clock = new THREE.Clock();
    
    function loop(){
	var time = Date.now() * 0.0005;
	var mixerUpdateDelta = clock.getDelta();
	mixer.update(mixerUpdateDelta);
    }

    setInterval(loop, 30) 

}

