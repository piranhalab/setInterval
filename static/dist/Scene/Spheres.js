import * as THREE from "../three/build/three.module.js";

export const addSpheres = {

    init: function(Scene){

	var positions = [];		  
	var spheres = [];
	
	for(var i = 0; i < 100 ; i ++){   	       
	    
	    var geometry = new THREE.SphereGeometry(5, 20, 20);
	   
	    var material = new THREE.MeshStandardMaterial( {
		color: 0xffffff,
		metalness: 0.8,
		roughness: 0.5,
		//transparent: true,
		//opacity: 0.75,
		
	    } );
	    
	    var posX, posY, posZ;
	    
	    posX = Math.random() * 600 - 300;
	    posY = Math.random() * 600 - 300;
	    posZ = Math.random() * 600 - 300;
	    
	    positions.push( posX, posY, posZ );
	    spheres[i] = new THREE.Mesh(geometry, material);

	    spheres[i].position.x = posX;
	    spheres[i].position.y = posY;
	    spheres[i].position.z = posZ; 

	    Scene.scene.add(spheres[i]);
	    
	}
    }
    
}
