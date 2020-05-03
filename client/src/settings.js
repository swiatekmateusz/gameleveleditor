import * as THREE from "three";
import wallMaterial from './mats/test.jpg'
import treasureMaterial from './mats/test2.jpg'


export default {
  radius: 200,
  wallMaterial: new THREE.MeshPhongMaterial({
    color: 0xbbbbbb,
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
  lightColor: 0xc01e1e,
}