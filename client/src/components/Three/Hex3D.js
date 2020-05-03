import * as THREE from "three";
import Doors from './Doors'
import settings from '../../settings'
import Light from './Things/Light'
import Treasure from './Things/Treasure'

class Hex3D {

  constructor(doors1, doors2, type) {

    var radius = settings.radius

    var container = new THREE.Object3D()
    container.position.y = radius / (12 / 2)

    var geometry = new THREE.BoxGeometry(radius * 1.2, radius, radius / 10);
    //var material = new THREE.MeshPhongMaterial({ color: 0x2f95c9, emissive: 0x000000 });
    var wall = new THREE.Mesh(geometry, settings.wallMaterial);
    wall.position.y = radius / (12 / 2)
    for (var i = 0; i < 6; i++) {
      let side
      if (i === doors1 || i === doors2) side = new Doors(radius)
      else side = wall.clone()
      side.position.x = Math.sin(2 * Math.PI - (Math.PI / 3) * i) * radius
      side.position.z = Math.cos(2 * Math.PI - (Math.PI / 3) * i) * radius
      side.lookAt(container.position)
      container.add(side)
    }

    var geometry2 = new THREE.CylinderGeometry(radius * 1.22, radius * 1.22, 1, 6);
    var plane = new THREE.Mesh(geometry2, settings.wallMaterial);
    plane.rotation.y = 11;
    plane.position.y = -(radius / 3)
    container.add(plane);

    let feature
    switch (type) {
      case "LIGHT":
        feature = new Light(plane)
        break;
      case "TREASURE":
        feature = new Treasure()
        break;
      default:
        break;
    }

    if (feature) container.add(feature)

    container.rotation.y = Math.PI
    return container
  }
}

export default Hex3D