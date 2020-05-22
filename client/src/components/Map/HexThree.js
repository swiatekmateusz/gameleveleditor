import React, { useEffect } from 'react';
import * as THREE from "three";
import OrbitControls from 'orbit-controls-es6';
import Hex3D from '../Three/classes/Hex/Hex3D'

const HexThree = () => {
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
    document.querySelector('.three').appendChild(renderer.domElement);

    camera.position.set(200, 200, 200)
    camera.lookAt(scene.position);

    // var axes = new THREE.AxesHelper(1000)
    // scene.add(axes)

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = true;
    controls.maxDistance = 1500;
    controls.minDistance = 0;
    controls.addEventListener('change', function () {
      renderer.render(scene, camera)
    });

    // var geometry = new THREE.PlaneBufferGeometry(1000, 1000, 32, 32);
    // var material = new THREE.MeshBasicMaterial({
    //   color: 0x2194ce,
    //   side: THREE.DoubleSide,
    //   wireframe: true,
    // });
    // var plane = new THREE.Mesh(geometry, material);
    // plane.rotation.x = Math.PI / 2;
    // plane.position.y = -5
    // scene.add(plane);
    scene.add(new Hex3D(0, 3))

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

    function render() {

      requestAnimationFrame(render);

      renderer.render(scene, camera);
    }

    render();
  }, []);

  return (
    <div className="three">

    </div>
  );
}

export default HexThree;