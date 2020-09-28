import * as THREE from "../three/build/three.module.js";
import { GLTFLoader } from '/js/three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from '/js/three/examples/jsm/loaders/DRACOLoader.js';

export const addCube = function (Scene) {

   
    var light1 = new THREE.PointLight( 0xb9d8e4, 0.25, 1450 );
    var light2 = new THREE.PointLight( 0xa450e0, 0.25, 1450 );
    var light3 = new THREE.PointLight( 0xe050d4, 0.25, 1450 );
    var light4 = new THREE.PointLight( 0xe0508c, 0.25, 1450 );

/*    
    var light1 = new THREE.PointLight( 0xffffff, 1, 1450 );
    var light2 = new THREE.PointLight( 0xffffff, 1, 1450 );
    var light3 = new THREE.PointLight( 0xffffff, 1, 1450 );
    var light4 = new THREE.PointLight( 0xffffff, 1, 1450 );
*/ 
    
    light1.position.y =30;
    light2.position.y =30;
    light3.position.y =30;
    light4.position.y =30;

    
    light1.position.x =440;
    light2.position.x =440;
    light3.position.x =-440;
    light4.position.x =-440;

    light1.position.z =440;
    light2.position.z =-440;
    light3.position.z =440;
    light4.position.z =-440;

    Scene.scene.add(light1);
    Scene.scene.add(light2);
    Scene.scene.add(light3);
    Scene.scene.add(light4);
    
    let vertices = [];
    let normals = [];
    let segments = 8;
    let indices = [];

    var geometry = new THREE.BufferGeometry();
    // var geometry = new THREE.Geometry();

    let moveS = 8;

  
    for(var x = -8.0; x <= 8.0; x = x + 0.05){
	for(var y = -moveS; y <= moveS; y = y + 1){
	    var equis = x * Math.cos(y) * 2;
	    var ye = x * Math.sin(y) * 2;
	    var zeta = y * Math.cos(x) * 2;
	    vertices.push(equis, ye, zeta);
	    normals.push(x, y);
	    // normals.push( 0, 0, 1 );
	}
    }

   
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( normals, 2 ) );

    // geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );

    geometry.computeBoundingSphere();
    geometry.computeVertexNormals(); // computed vertex normals are orthogonal to the face for non-indexed BufferGeometry

    
    //let mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    // var mat = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

    var video = document.getElementById( 'videooo' );

    let texture = new THREE.VideoTexture( video );

    // video.play();
    
    //var texture = new THREE.TextureLoader().load( "/img/casa.jpg" );

    //texture.wrapS = THREE.MirrorRepeatWrapping;
    //texture.wrapT = THREE.MirrorRepeatWrapping;
    // texture.repeat.set( 0.25, 0.5 ); // 4x4 si se ve pixeleado
   
    let mat = new THREE.MeshStandardMaterial( {
// 	 color: 0xffffff,
	 metalness: 0.8,
	 roughness: 0.5,
	 side: THREE.DoubleSide, 
  	// map: texture                     
        //transparent: true,
        //opacity: 0.75,
    });
    
    //var wireframe = new THREE.WireframeGeometry( geometry );

    let Cube = new THREE.Mesh(geometry, mat);
    window.Cube = Cube; 

    /*
    window.addEventListener("startStream", function (event) {

	let id = event.detail.id;
        let vid = document.querySelector(`#${id}`);
        let map = new THREE.VideoTexture(vid);
	// Console.debug("holaaaaa", vid);
        Cube.material.map = map;
        Cube.material.needsUpdate = true;
	video.play();

    });
  */ 
    
    Cube.geometry.verticesNeedUpdate = true;
    Cube.geometry.normalsNeedUpdate = true;
    Cube.material.needsUpdate = true; 
    // Cube.material.map.needsUpdate = true;
   
    // Cube.position.x = -20;
    
    Cube.position.y = 10; 
    Scene.scene.add(Cube);

    //var geometryP = new THREE.PlaneGeometry( 5, 20, 32 );
    //var materialP = new THREE.MeshBasicMaterial( {color: 0xffff00, map: texture, side: THREE.DoubleSide} );
    //var planeP = new THREE.Mesh( geometryP, materialP );
    //Scene.scene.add( planeP );

    
    rotate(Cube);
    return Cube;
    // screw(geometry);
    // return screw; 

};

function rotate(cube) {
    
    let moveS = 0.0; 
    let moveX = 0.0;
    var mixer; 

    let loader = new GLTFLoader();

    var dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/js/three/examples/js/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );
    
    loader.load(
	// resource URL
	'/3d/model.glb',
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


    
 var listener = new THREE.AudioListener();
    Scene.camera.add( listener );
    
    // create a global audio source
    var audio = new THREE.Audio( listener );
    
    // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();

    
    // audioLoader.load( '/snd/track.ogg', function( buffer ) {
    audioLoader.load( '/snd/track.ogg', function( buffer ) {
	audio.setBuffer( buffer );
	audio.setLoop( true );
	audio.setVolume( 0.5 );
	// audio.play();
    });
    
    let fftSize = 2048 /2;
    //let fftSize = 32; 
    let analyser = new THREE.AudioAnalyser( audio, fftSize );
    var clock; 
    clock = new THREE.Clock();

    
    function loop() {
	let vertices = [];
	let normals = [];
	let indices = [];
	let segments = 8;

 	let data = analyser.getFrequencyData();

	// console.log(data2); 
		
	cube.geometry.verticesNeedUpdate = true;
	cube.geometry.normalsNeedUpdate = true;
    
	var time = Date.now() * 0.0005;
	var mixerUpdateDelta = clock.getDelta();

	mixer.update(mixerUpdateDelta);
	
        cube.rotation.z +=  0.001;
	//cube.rotation.y += 0.001;
	//cube.rotation.x += -0.001;

	//let geoOld = Cube.geometry.getAttribute('position');

/*	
	for(var x = -moveX; x <= moveX; x = x + 0.05){
	    for(var y = -4.0; y <= 4.0; y = y + 0.5){
		var equis = x * Math.cos(y)*150;
		var ye = x * Math.sin(y)*150;
		var zeta = y * Math.cos(x) * 150;		
		vertices.push(equis, ye, zeta);
		// normals.push(equis, ye, zeta); 
	    }
	}
	
	cube.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
	cube.geometry.computeBoundingSphere();
	cube.geometry.computeVertexNormals(); // computed vertex normals are orthogonal to the face for non-indexed BufferGeometry


*/	

	
 /*
    for ( var i = 0; i < segments; i ++ ) {
	
	for ( var j = 0; j < segments; j ++ ) {
	    
	    var a = i * ( segments + 1 ) + ( j + 1 );
	    var b = i * ( segments + 1 ) + j;
	    var c = ( i + 1 ) * ( segments + 1 ) + j;
	    var d = ( i + 1 ) * ( segments + 1 ) + ( j + 1 );
	    
	    // generate two faces (triangles) per iteration
	    
	    indices.push( a, b, d ); // face one
	    indices.push( b, c, d ); // face two

	}
	
    }
   
    
     Cube.geometry.setIndex( indices );   
*/ 	
	// let moveS = 4;
	var loc=0; 

	// STEINBACH SCREW
	/*
	for(var x = -2; x <= 2; x = x + 0.05){
	    for(var y = -3; y <= 3; y = y + 0.8){

		var equis = x * Math.cos(y) * 50;
		var ye = x * Math.sin(y) *50;
		var zeta = y * Math.cos(x) * 50;
		vertices.push(equis*(1+data[loc%512]/128), ye*(1+data[loc%512]/128), zeta*(1+data[loc%512]/128));
		// vertices.push(equis, ye, zeta);
		// normals.push(equis, ye, zeta);
		normals.push( 0, 0, 1 );
		loc++;
	    }
	}
	*/

	// TriaxialTritorus


	for(var x = -moveS; x <= moveS; x = x + 0.075){
	    for(var y = -3; y <= 3; y = y + 0.5){

		var equis = Math.sin(x) * (1+Math.cos(y)) * 50;
		var ye = Math.sin(x + (Math.PI*2) /3) * (1 + Math.cos(y+(Math.PI *2)/3)) * 75;
		var zeta = Math.sin(x+2*(Math.PI * 2)/3) * (1 + Math.cos(y+(2*Math.PI*2) / 3 )) * 75;
 		// vertices.push(equis*(1+data[loc%512]/128), ye*(1+data[loc%512]/128), zeta*(1+data[loc%512]/128));
		vertices.push(equis, ye, zeta);
		// normals.push(equis, ye, zeta);
		normals.push( 0, 0, 1 );
		loc++;
	    }
	}


	// MaedersOwl

/*

	for(var x = -6; x <= 6; x = x + 0.05){
	    for(var y = -3; y <= 3; y = y + 0.5){

		var equis = (y * Math.cos(x) * Math.pow(y, 2) * Math.cos(2 * x)) * 10;
		var ye = (-y * Math.sin(x) * Math.pow(y, 2) * Math.sin (2 * x)) * 10;
		var zeta = (4* Math.pow(y, 1.5) * Math.cos(3* x /2) / 3) * 10;
 		vertices.push(equis * ( 1 + data[loc%512]/128 ), ye * ( 1 + data[loc%512]/128), zeta * ( 1 + data[loc%512]/128 ));
		// vertices.push(equis, ye, zeta);
		// normals.push(equis, ye, zeta);
		normals.push( 0, 0, 1);
		// normals.push(x, y);
	
		loc++;
	    }
	}

*/

/*	

    for ( var i = 0; i < segments; i ++ ) {
	
	for ( var j = 0; j < segments; j ++ ) {
	    
	    var a = i * ( segments + 1 ) + ( j + 1 );
	    var b = i * ( segments + 1 ) + j;
	    var c = ( i + 1 ) * ( segments + 1 ) + j;
	    var d = ( i + 1 ) * ( segments + 1 ) + ( j + 1 );
	    
	    // generate two faces (triangles) per iteration
	    
	    indices.push( a, b, d ); // face one
	    indices.push( b, c, d ); // face two

	}
	
    }
  */  
// 	 cube.geometry.setIndex( indices );
	// itemSize = 3 because there are 3 values (components) per vertex
	cube.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3));
	//cube.geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
	cube.geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( normals, 2 ) );
	
	// geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
	
	// cube.geometry.computeBoundingSphere();
	cube.geometry.computeVertexNormals(); // computed vertex normals are orthogonal to the face for non-indexed BufferGeometry
	
	

	moveS+=0.001;

	if(moveS >= 18){
	    moveS = 0; 
	}
// 	console.log(moveS); 
	

	//moveX+=0.001;

	//if(moveX >= 6.0){
	//    moveX = 2.0; 
	//}

	
	
	
// 	console.debug(moveS); 
        // requestAnimationFrame(loop);
    }
    //loop();
    setInterval(loop, 30)
}

