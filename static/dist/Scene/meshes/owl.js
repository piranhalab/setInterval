import * as THREE from "../../three/build/three.module.js";

export const addOwl = function (Scene) {

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

        let mat = new THREE.MeshStandardMaterial( {
	 metalness: 0.8,
	 roughness: 0.5,
	 side: THREE.DoubleSide, 
    });
    
    let Mesh = new THREE.Mesh(geometry, mat);
    window.Mesh = Mesh; 

    Mesh.geometry.verticesNeedUpdate = true;
    Mesh.geometry.normalsNeedUpdate = true;
    Mesh.material.needsUpdate = true; 

    Mesh.position.y = 10; 
    Scene.scene.add( Mesh );

    move(Mesh);
    return Mesh;

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

	for(var x = -6; x <= 6; x = x + 0.05){
	    for(var y = -3; y <= 3; y = y + 0.5){

		var equis = (y * Math.cos(x) * Math.pow(y, 2) * Math.cos(2 * x)) * 10;
		var ye = (-y * Math.sin(x) * Math.pow(y, 2) * Math.sin (2 * x)) * 10;
		var zeta = (4* Math.pow(y, 1.5) * Math.cos(3* x /2) / 3) * 10;
 		//vertices.push(equis * ( 1 + data[loc%512]/128 ), ye * ( 1 + data[loc%512]/128), zeta * ( 1 + data[loc%512]/128 ));
		 vertices.push(equis, ye, zeta);
		// normals.push(equis, ye, zeta);
		normals.push( 0, 0, 1);
		// normals.push(x, y);
	
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

    setInterval(loop, 30) 
    
}

