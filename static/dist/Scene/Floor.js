import * as THREE from "../three/build/three.module.js";
export const addFloor = function (Scene) {
    let geom = new THREE.PlaneGeometry(500, 200);
    let mat = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    let floor = new THREE.Mesh(geom, mat);
    floor.rotateX(-Math.PI / 2);
    // Scene.scene.add(floor);
    return floor;
};
