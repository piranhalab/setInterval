import * as THREE from "../three/build/three.module.js";

export const addLights = {

    init: function(Scene){
	var light1 = new THREE.PointLight( 0xffffff, 1, 1450 );
	var light2 = new THREE.PointLight( 0xffffff, 1, 1450 );
	var light3 = new THREE.PointLight( 0xffffff, 1, 1450 );
	var light4 = new THREE.PointLight( 0xffffff, 1, 1450 );
	
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
    }

}
