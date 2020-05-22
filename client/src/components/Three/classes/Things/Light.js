import * as THREE from "three";
import settings from '../../../../settings'

class Light {
  constructor(intensity = .1) {
    var container = new THREE.Object3D()
    //var light = new THREE.DirectionalLight(0xffff00, 1);
    var light = new THREE.PointLight(settings.lightColor, intensity, 250);

    //var light = new THREE.PointLight(0xffff00, 2)
    light.position.set(0, settings.radius / 10, 0);


    // var geometry = new THREE.BoxGeometry(10, 10, 10);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var cube = new THREE.Mesh(geometry, material);
    //cube.position.set(0, settings.radius / 20, 0);
    //console.log(light)
    container.add(light)
    //container.add(cube)

    return container
  }
}

export default Light