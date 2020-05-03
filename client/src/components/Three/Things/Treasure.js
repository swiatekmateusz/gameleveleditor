import * as THREE from "three";
import settings from '../../../settings'

class Treasure {
  constructor() {
    var geometry = new THREE.BoxGeometry(settings.radius / 4, settings.radius / 4, settings.radius / 4);
    //var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, settings.treasureMaterial);
    cube.position.y = -(settings.radius / 25)
    console.log(cube)
    return cube
  }
}

export default Treasure