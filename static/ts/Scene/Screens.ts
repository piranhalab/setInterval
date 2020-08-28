import * as THREE from "../three/build/three.module.js";

export const addScreens = function(Scene):THREE.Mesh{
	let geom = new THREE.PlaneGeometry( 10, 10 );
	let mat = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
	let Screen = new THREE.Mesh(geom, mat)

	Screen.rotateX(-Math.PI/2)
	Scene.scene.add(Screen)
	return Screen
}
