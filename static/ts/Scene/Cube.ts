import * as THREE from "../three/build/three.module.js";

export const addCube = function(Scene):THREE.Mesh{
	let geom = new THREE.CubeGeometry( 2, 2, 2 );
	let mat = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
	let Cube = new THREE.Mesh(geom, mat)

	Cube.position.x = -20
	Scene.scene.add(Cube)
	rotate(Cube)
	return Cube
}

function rotate(cube){
	function loop(){
		cube.rotation.x += 0.1
		requestAnimationFrame(loop)
	}
	loop()
}
