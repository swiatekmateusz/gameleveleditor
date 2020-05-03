import React, { useEffect, useContext } from 'react';
import { LevelContext } from '../levelContext/LevelContext'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Level3D from './Three/Level3D'

const Map = () => {
  const levelContext = useContext(LevelContext)
  const { returnObject } = levelContext
  const level = returnObject()
  console.log(level.level)
  level.level.sort((a, b) => {
    if (a.hexId > b.hexId) return 1
    else return -1
  })
  console.log(level)

  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      45,    // kąt patrzenia kamery (FOV - field of view)
      window.innerWidth / window.innerHeight,    // proporcje widoku, powinny odpowiadać proporcjom naszego ekranu przeglądarki
      0.1,    // minimalna renderowana odległość
      10000    // maksymalna renderowana odległość od kamery
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x0066ff);
    renderer.setSize(window.innerWidth, window.innerHeight - 5);
    document.querySelector('.map').appendChild(renderer.domElement);
    camera.position.set(200, 200, 200)
    camera.lookAt(scene.position);
    var orbitControl = new OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
      renderer.render(scene, camera)
    });
    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)
    console.log(axes)
    const level3d = new Level3D(level.size, level.level)
    console.log(level3d)
    scene.add(level3d)

    // var light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(0, 1, 1).normalize();
    // scene.add(light);

    function render() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
    render();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="map">

    </div>
  );
}

export default Map;