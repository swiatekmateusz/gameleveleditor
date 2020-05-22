import React, { useEffect, useContext } from 'react';
import { LevelContext } from '../../levelContext/LevelContext'
import * as THREE from "three";
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Level3D from '../Three/Level3D'
import Player from '../Three/classes/Player/Player'
import settings from '../../settings'

const Map = () => {
  const levelContext = useContext(LevelContext)
  const { returnObject } = levelContext
  const level = returnObject()

  level.level.sort((a, b) => {
    if (a.hexId > b.hexId) return 1
    else return -1
  })

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
    document.querySelector('.map').appendChild(renderer.domElement);
    camera.position.set(200, 200, 200)
    camera.lookAt(scene.position);
    const level3d = new Level3D(level.size, level.level)
    var geometry = new THREE.PlaneGeometry(level3d.info.width, level3d.info.height, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0x2194ce, side: THREE.DoubleSide, transparent: true, opacity: 0 });
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    plane.position.z = level3d.info.z;
    plane.position.y = level3d.position.y + settings.radius / 15
    scene.add(plane);
    scene.add(level3d)
    const player = new Player(camera, scene, true, false, level3d.info.playerX, plane.position.y, level3d.info.playerZ)
    scene.add(player.getPlayerCont())
    var clock = new THREE.Clock();
    function render() {
      console.log("redner")
      if (renderFlag) {
        player.renderMove(clock)
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      }
    }
    render();
    return () => {
      renderFlag = false
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="map">

    </div>
  );
}

export default Map;