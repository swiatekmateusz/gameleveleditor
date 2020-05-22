import React, { useEffect } from 'react';
import * as THREE from "three";
import Player from '../Three/classes/Player/Player'

const Movement = () => {
  let renderFlag = true

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
    document.querySelector('.movement').appendChild(renderer.domElement);
    camera.position.set(200, 200, 200)
    camera.lookAt(scene.position);

    // var axes = new THREE.AxesHelper(1000)
    // scene.add(axes)

    var geometry = new THREE.PlaneGeometry(1000, 1000, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0x2194ce, side: THREE.DoubleSide, wireframe: true });
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    // var light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(0, 1, 1).normalize();
    // scene.add(light);
    const player = new Player(camera, scene, true, true, 0, 0, 0)
    scene.add(player.getPlayerCont())



    var clock = new THREE.Clock();
    function render() {
      console.log("render")
      if (renderFlag) {
        player.renderMove(clock)
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      }
    }
    render();
    // eslint-disable-next-line
    return () => {
      renderFlag = false
    }
  }, []);
  return (
    <div className="movement">

    </div>
  );
}

export default Movement;