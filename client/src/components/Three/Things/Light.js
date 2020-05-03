import * as THREE from "three";
import settings from '../../../settings'

class Light {
  constructor(target) {
    var container = new THREE.Object3D()
    //var light = new THREE.DirectionalLight(0xffff00, 1);
    var light = new THREE.SpotLight(settings.lightColor, 1, 0, Math.PI, 1, 2);

    //var light = new THREE.PointLight(0xffff00, 2)
    light.target = target
    light.position.set(0, settings.radius / (3 / 2), 0);


    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, settings.radius / (3 / 2) / 2, 0);
    container.add(light)
    container.add(cube)

    return container
  }
}

export default Light