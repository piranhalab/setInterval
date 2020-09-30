import * as THREE from "../../three/build/three.module.js";
import { GLTFLoader } from '/dist/three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from '/dist/three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFExporter } from '/dist/three/examples/jsm/exporters/GLTFExporter.js';

export const exporter = {

    init: function(Scene){

	let loader = new GLTFLoader();
	//var dracoLoader = new DRACOLoader();
	//dracoLoader.setDecoderPath( '/js/three/examples/js/libs/draco/' );
	//loader.setDRACOLoader( dracoLoader );
	
	loader.load(
	    '../3d/2020-09-29--22-26-17.gltf',
	    function ( gltf ) {
		
		let fuente = gltf.scene
		Window.fuente = fuente;
		
		fuente.scale.multiplyScalar(20)
		//fuente.material = mat; 
	    
		fuente.position.set(0, 10, 40)
		
		Scene.scene.add(fuente)
		Scene.fuente = fuente
		
		//var animations = gltf.animations;
		
		//mixer = new THREE.AnimationMixer( fuente );
		
		//var action = mixer.clipAction( animations[ 0 ] );
		//action.play();

		// exporter.fuente = fuente;                                          
		
		var exporter = new GLTFExporter();
		
		exporter.parse( gltf, function ( gltf ) {
		    //console.log( gltf );
		    //downloadJSON( gltf );
		    
		    var output = JSON.stringify( gltf, null, 2 );
		    console.log( gltf );
		    saveString( gltf, '../3d/scene.gltf' );
		    
		} );
		
		
	    })

	var options = {
	    trs: true,
	    onlyVisible: true,
	    truncateDrawRange: true,
 // To prevent NaN value
	};
		// this.movimiento move(fuente);
	//return fuente;
	
//	move();

    },

    destroy: function(Scene){
	//console.log(this.movimiento, this.fuente )
	//learInterval(this.movimiento)
	//this.fuente.geometry.dispose()
	//this.fuente.material.dispose()

	
	exporter.fuente.children.forEach(
	    function (hijo){
		hijo.geometry.dispose()
		hijo.material.dispose()
		Scene.scene.remove(hijo)
	    }
	)

	Scene.scene.remove(exporter.fuente); 
	
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

function save( blob, filename ) {

    var link = document.createElement( 'a' );
    link.style.display = 'none';
    document.body.appendChild( link ); // Firefox workaround, see #6594
    
    link.href = URL.createObjectURL( blob );
    link.download = filename;
    link.click();
    
    // URL.revokeObjectURL( url ); breaks Firefox...
    
}

function saveString( text, filename ) {

    save( new Blob( [ text ], { type: 'text/plain' } ), filename );
    
}
