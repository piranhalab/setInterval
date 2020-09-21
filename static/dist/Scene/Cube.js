import * as THREE from "../three/build/three.module.js";
export const addCube = function (Scene) {


    /*
    var light1 = new THREE.PointLight( 0xa58ea8, 5, 450 );
    var light2 = new THREE.PointLight( 0x7d2f74, 5, 450 );
    var light3 = new THREE.PointLight( 0x2a315b, 5, 450 );
    var light4 = new THREE.PointLight( 0x4484b0, 5, 450 );
    */

    var light1 = new THREE.PointLight( 0xff71ce, 24, 450 );
    var light2 = new THREE.PointLight( 0x01cdfe, 24, 450 );
    var light3 = new THREE.PointLight( 0xfffb96, 24, 450 );
    var light4 = new THREE.PointLight( 0xb967ff, 24, 450 );

    
    light1.position.y =30;
    light2.position.y =30;
    light3.position.y =30;
    light4.position.y =30;

    
    light1.position.x =40;
    light2.position.x =40;
    light3.position.x =-40;
    light4.position.x =-40;

    light1.position.z =40;
    light2.position.z =-40;
    light3.position.z =40;
    light4.position.z =-40;

    
    Scene.scene.add(light1);
    Scene.scene.add(light2);
    Scene.scene.add(light3);
    Scene.scene.add(light4);
    
    /*
    let geom = new THREE.PlaneGeometry(24, 24, 50, 50);

    for (let i = 0; i < geom.vertices.length; i++) {
	geom.vertices[i].y += (Math.random()*6)-3;
    }
    */

    let vertices = [];
    let normals = []; 
    var geometry = new THREE.BufferGeometry();
    // var geometry = new THREE.Geometry();

    let moveS = 4.0;
	
    for(var x = -6.0; x <= 6.0; x = x + 0.05){
	for(var y = -moveS; y <= moveS; y = y + 0.5){
	    var equis = x * Math.cos(y)*2;
	    var ye = x * Math.sin(y)*2;
	    var zeta = y * Math.cos(x) * 2;
	    vertices.push(equis, ye, zeta);
	    // normals.push(equis, ye, zeta); 
	}
    }

    
    // geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

    
// itemSize = 3 because there are 3 values (components) per vertex
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    geometry.setAttribute( 'normals', new THREE.Float32BufferAttribute( normals, 3 ) );

    // geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );

    geometry.computeBoundingSphere();
    geometry.computeVertexNormals(); // computed vertex normals are orthogonal to the face for non-indexed BufferGeometry

    
    //let mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    // var mat = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

  
    let mat = new THREE.MeshStandardMaterial( {
	color: 0x000000,
	metalness: 0.2,
	roughness: 0.9,
	side: THREE.DoubleSide 
	// map: floorTexture,
        //transparent: true,
        //opacity: 0.75,
    });
 

   
    //var wireframe = new THREE.WireframeGeometry( geometry );


    let Cube = new THREE.Mesh(geometry, mat);
    window.Cube = Cube; 
    
    Cube.geometry.verticesNeedUpdate = true;
    Cube.geometry.normalsNeedUpdate = true;
                 
    // Cube.position.x = -20;
    Cube.position.y = 10; 
    Scene.scene.add(Cube);

    /*
 window.addEventListener("startStream", function (event) {
        let id = event.detail.id;
        let vid = document.querySelector(`#${id}`).querySelector("video");
        let map = new THREE.VideoTexture(vid);
        Cube.material.map = map;
        Cube.material.needsUpdate = true;
    });
    */
    
    rotate(Cube);
    return Cube;
    // screw(geometry);
    // return screw; 

};
function rotate(cube) {
    
    let moveS = 4.0; 
    let moveX = 4.0;
    
    function loop() {
	let vertices = [];

	var time = Date.now() * 0.0005;

        //cube.rotation.z +=  Math.sin( time * 0.7/4 ) * 0.125;
	//cube.rotation.y += 0.01;
	//cube.rotation.x += -0.01;

	//let geoOld = Cube.geometry.getAttribute('position');
	
	for(var x = -moveX; x <= moveX; x = x + 0.075){
	    for(var y = -moveS; y <= moveS; y = y + 0.75){
		var equis = x * Math.cos(y)*125;
		var ye = x * Math.sin(y)*125;
		var zeta = y * Math.cos(x) * 125;		
		vertices.push(equis, ye, zeta);
		// normals.push(equis, ye, zeta); 
	    }
	}
	
	cube.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
	cube.geometry.computeBoundingSphere();
	cube.geometry.computeVertexNormals(); // computed vertex normals are orthogonal to the face for non-indexed BufferGeometry

	
	cube.geometry.verticesNeedUpdate = true;
	cube.geometry.normalsNeedUpdate = true;
    
	
	moveX+=0.001;

	if(moveX >= 6.0){
	    moveX = 1.0; 
	}
	

	
	
	
	console.debug(moveS); 
        // requestAnimationFrame(loop);
    }
    //loop();
    setInterval(loop, 13)
}


