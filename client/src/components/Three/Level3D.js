import * as THREE from "three";
import Hex3D from './classes/Hex/Hex3D'
import settings from '../../settings'

class Level3D {

  constructor(size, level) {
    var radius = settings.radius

    var container = new THREE.Object3D()
    let width = radius * 2.5 * size
    let height = radius * 2.7 * size
    let playerX = 0
    let playerZ = 0
    let tmp
    level.forEach((hex, i) => {
      if (i === 0) {
        playerX = (radius * 1.2 * hex.x * 1.5) + (radius * -1 * size / 2)
        playerZ = (radius * 1.2 * hex.y * 1.74) + (radius * -1 * size / 2)
        if (hex.x % 2 === 1) {
          playerZ += radius * 1.05
        }
      }
      let tmp2 = hex.dirIn
      const hex3d = new Hex3D(tmp, tmp2, hex.type)
      tmp = hex.dirOut
      hex3d.position.x = radius * 1.2 * hex.x * 1.5
      hex3d.position.z = radius * 1.2 * hex.y * 1.74
      if (hex.x % 2 === 1) hex3d.position.z += radius * 1.05
      container.add(hex3d)
    })
    container.position.x = radius * -1 * size / 2
    container.position.z = radius * -1 * size / 2
    container.position.y = 0
    container.info = {
      width,
      height,
      x: radius * -1 * size / 2,
      z: radius * (size / 2),
      playerX,
      playerZ
    }
    return container
  }
}

export default Level3D