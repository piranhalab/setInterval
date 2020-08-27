import * as THREE from "../three/build/three.module.js";
import { Users } from "../Users.js";
export const Avatar = {
    avatars: {},
    init: function (Scene) {
        let texture1 = new THREE.TextureLoader().load('/img/avTex1.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0.6, 0.6);
            texture.repeat.set(1, 1);
        });
        let texture2 = new THREE.TextureLoader().load('/img/avTex2.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0.6, 0.6);
            texture.repeat.set(1, 1);
        });
        let texture3 = new THREE.TextureLoader().load('img/avTex3.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0.6, 0.6);
            texture.repeat.set(1, 1);
        });
        let texture4 = new THREE.TextureLoader().load('img/avTex4.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0.6, 0.6);
            texture.repeat.set(1, 1);
        });
        this.textures = [texture1, texture2, texture3, texture4];
        // load fonts
        let group = new THREE.Group();
        let avatar = new THREE.Group();
        let avbodyMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            //metalness: 0.9,
            ////roughness: 0.8,
            map: texture1,
        });
        let avbodyGeometry = new THREE.CylinderGeometry(1.5, 0.5, 6, 32);
        let avbodyMesh = new THREE.Mesh(avbodyGeometry, avbodyMaterial);
        avbodyMesh.position.y = 4;
        group.add(avbodyMesh);
        let avheadMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.8,
            roughness: 0.5,
        });
        let avheadGeometry = new THREE.SphereGeometry(1.75, 10, 10);
        //var avheadMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        let avheadSphere = new THREE.Mesh(avheadGeometry, avbodyMaterial);
        avheadSphere.position.y = 10;
        group.add(avheadSphere);
        var aveyeGeometry = new THREE.SphereGeometry(0.7, 10, 10);
        var aveyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var aveyeSphere = new THREE.Mesh(aveyeGeometry, aveyeMaterial);
        aveyeSphere.position.y = 10;
        aveyeSphere.position.z = 1.7;
        aveyeSphere.scale.y = 0.5;
        aveyeSphere.scale.z = 0.25;
        group.add(aveyeSphere);
        var aveye2Geometry = new THREE.SphereGeometry(0.2, 10, 10);
        var aveye2Material = new THREE.MeshBasicMaterial({ color: 0x00000 });
        var aveye2Sphere = new THREE.Mesh(aveye2Geometry, aveye2Material);
        aveye2Sphere.position.y = 10;
        aveye2Sphere.position.z = 1.9;
        //aveyeSphere.scale.y = 0.5;
        aveye2Sphere.scale.z = 0.25;
        group.add(aveye2Sphere);
        //edges.scene.add(group);
        //
        this.avatar = group;
        this.initEvents(Scene);
        return this;
    },
    createLabel: function (nickname, avatar) {
        let loader = new THREE.FontLoader();
        loader.load('/fonts/helvetiker_regular.typeface.json', function (font) {
            let textLabel;
            let matDark = new THREE.LineBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.5
            });
            var shapes = font.generateShapes(nickname, 2);
            var geometry = new THREE.ShapeBufferGeometry(shapes);
            geometry.computeBoundingBox();
            var xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
            geometry.translate(xMid, 0, 0);
            textLabel = new THREE.Mesh(geometry, matDark);
            textLabel.position.x = 0;
            textLabel.position.y = Avatar.offsetNicknameY;
            textLabel.position.z = 0;
            avatar.add(textLabel);
        });
    },
    initEvents: function (Scene, offsetY) {
        window.addEventListener("addUser", function (event) {
            const uuid = event.detail.uuid;
            let nickname = Users[uuid].nickname;
            let pos = Users[uuid].pos;
            let rot = Users[uuid].rot;
            let avt = Avatar.avatar.clone();
            Avatar.createLabel(nickname, avt);
            avt.position.set(pos.x, pos.y + Avatar.offsetY, pos.z);
            Scene.scene.add(avt);
            Avatar.avatars[uuid] = avt;
        });
        window.addEventListener("removeUser", function (event) {
            const uuid = event.detail.uuid;
            let avt = Avatar.avatars[uuid];
            for (let k = 0; k < avt.children.length; k++) {
                avt.remove(avt.children[k]);
            }
            Scene.scene.remove(avt);
            Scene.renderer.renderLists.dispose();
        });
        window.addEventListener("rotateUser", function (event) {
            const uuid = event.detail.uuid;
            let rot = event.detail.rot;
            let avt = Avatar.avatars[uuid];
            avt.rotation.y = rot.y;
        });
        window.addEventListener("moveUser", function (event) {
            const uuid = event.detail.uuid;
            let pos = event.detail.pos;
            let avt = Avatar.avatars[uuid];
            avt.position.set(pos.x, pos.y + Avatar.offsetY, pos.z);
        });
    },
    offsetY: -14,
    offsetNicknameY: 14,
};
