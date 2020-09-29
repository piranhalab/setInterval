import * as THREE from "../three/build/three.module.js";

export const addScreens = function(Scene):THREE.Mesh{
	let geom = new THREE.PlaneGeometry( 20, 20 );
	let mat = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide} );
	let Screen = new THREE.Mesh(geom, mat)

	Screen.position.y = 5
	Scene.scene.add(Screen)

	window.addEventListener("startStream",function(event:CustomEvent){
		let id = event.detail.id		
		let vid = document.querySelector(`#${id}`)
		let map = new THREE.VideoTexture( vid );
		Screen.material.map = map
		Screen.material.needsUpdate = true
	})

	return Screen
}
