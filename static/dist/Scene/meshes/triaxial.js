import * as THREE from "../../three/build/three.module.js";

export const triaxial =  {

    init: function(Scene){
    
    let vertices = [];
    let normals = [];
    let segments = 8;
    let indices = [];

    var geometry = new THREE.BufferGeometry();

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

    geometry.computeBoundingSphere();
    geometry.computeVertexNormals();

        let mat = new THREE.MeshBasicMaterial( {
	// metalness: 0.8,
	// roughness: 0.5,
	 side: THREE.DoubleSide, 
    });
    
    let Mesh = new THREE.Mesh(geometry, mat);
    window.Mesh = Mesh; 

    Mesh.geometry.verticesNeedUpdate = true;
    Mesh.geometry.normalsNeedUpdate = true;
    Mesh.material.needsUpdate = true; 

        let vid = document.querySelector("#streaming-video");
        let map = new THREE.VideoTexture(vid);
        Mesh.material.map = map;
        Mesh.material.needsUpdate = true;
	console.log(vid);
	//});

	
    Mesh.position.y = 10; 
    Scene.scene.add( Mesh );

	this.mesh = Mesh;
	this.movimiento = move(Mesh); 
	return Mesh;
    },

    
    destroy: function(Scene){
	console.log(this.movimiento, this.mesh)
	clearInterval(this.movimiento)
	this.mesh.geometry.dispose()
	this.mesh.material.dispose()
	Scene.scene.remove(this.mesh);
	Scene.renderer.renderLists.dispose();
    },

    movimiento: null

}

function move(mesh){

    let moveS = 0.0; 
    let moveX = 0.0;

    // Hace falta el audio reactivo

    function loop() {
	let vertices = [];
	let normals = [];
	let indices = [];
	let segments = 8;

	//Y el análisis 

	mesh.geometry.verticesNeedUpdate = true;
	mesh.geometry.normalsNeedUpdate = true;

	mesh.rotation.z +=  0.001;

	var loc = 0;

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


	mesh.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3));
	mesh.geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( normals, 2 ) );
	
	mesh.geometry.computeVertexNormals(); // computed vertex normals are orthogonal to th	
	moveS+=0.001;

	if(moveS >= 18){
	    moveS = 0; 
	}	
    }

    return setInterval(loop, 30) 
    
}

