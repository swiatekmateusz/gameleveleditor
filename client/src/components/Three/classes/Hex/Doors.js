import * as THREE from "three";
import settings from '../../../../settings'

class Doors {

  constructor(radius) {

    var container = new THREE.Object3D()
    container.position.y = radius / (12 / 2)

    var geometry = new THREE.BoxGeometry(radius * 1.2 / 3, radius, radius / 10);
    var wall = new THREE.Mesh(geometry, settings.wallMaterial);
    wall.position.x = radius * 1.2 / 3
    container.add(wall)

    const wall2 = wall.clone()
    wall.position.x = -(radius * 1.2 / 3)
    container.add(wall2)
    return container
  }
}

export default Doors