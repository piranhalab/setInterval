import * as THREE from "./three/build/three.module.js";
import { Controls } from "./Controls.js";
import { Avatar } from "./Scene/Avatar.js";
import { addFloor } from "./Scene/Floor.js";
import { addCube } from "./Scene/Cube.js";
export const Scene = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer: new THREE.WebGLRenderer(),
    init: function () {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.controls = Controls.init(this);
        this.avatar = Avatar.init(this);
        this.Floor = addFloor(this);
        this.Cube = addCube(this);
        this.animate();
    },
    animate: function () {
        window.requestAnimationFrame(Scene.animate);
        Scene.renderer.render(Scene.scene, Scene.camera);
    }
};
window.addEventListener('resize', function onWindowResize() {
    Scene.camera.aspect = window.innerWidth / window.innerHeight;
    Scene.camera.updateProjectionMatrix();
    Scene.renderer.setSize(window.innerWidth, window.innerHeight);
}, false);
window.Scene = Scene;
window.THREE = THREE;
