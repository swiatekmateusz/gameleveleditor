import * as THREE from "three";
import wallMaterial from './mats/test.jpg'
import treasureMaterial from './mats/test2.jpg'


export default {
  radius: 100,
  wallMaterial: new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xbbbbbb,
    shininess: 5,
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(wallMaterial),
  }),
  treasureMaterial: new THREE.MeshPhongMaterial({
    color: 0x7c1212,
    specular: 0x7c1212,
    shininess: 5,
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load(treasureMaterial),
  }),
  lightColor: 0xffffff,
  playerSpeed: 4,
}