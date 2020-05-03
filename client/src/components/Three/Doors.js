import * as THREE from "three";
import settings from '../../settings'

class Doors {

  constructor(radius) {

    var container = new THREE.Object3D() // kontener na obiekty 3D
    container.position.y = radius / (12 / 2)

    var geometry = new THREE.BoxGeometry(radius * 1.2 / 3, radius, radius / 10);
    //var material = new THREE.MeshPhongMaterial({ color: 0x2f95c9, emissive: 0x000000 });
    var wall = new THREE.Mesh(geometry, settings.wallMaterial); // prostopadłościan - ściana hex-a
    wall.position.x = radius * 1.2 / 3
    container.add(wall)

    const wall2 = wall.clone()
    wall.position.x = -(radius * 1.2 / 3)
    container.add(wall2)
    return container
  }
}

export default Doors