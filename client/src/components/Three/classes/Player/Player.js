import * as THREE from 'three'
import settings from '../../../../settings'
import Model from './Model'

class Player {
  constructor(camera, scene, model = false, axes = false, playerX, playerY, playerZ) {
    this.camera = camera
    this.scene = scene
    this.container = new THREE.Object3D()
    const material = new THREE.MeshBasicMaterial({
      color: 0x2194ce,
      wireframe: true,
    })
    this.animation = "stand"
    this.model = model
    this.modelMesh = null
    if (this.model) {
      this.player = new Model(this.scene)
      this.player.loadModel((container) => {
        this.modelMesh = container
        this.scene.add(container)
        this.container.add(container)
      })
      //this.container.add(this.model.returnContainer())
      //console.log(this.container)
    } else {
      const geometry = new THREE.BoxGeometry(40, 40, 40)
      this.player = new THREE.Mesh(geometry, material) // player sześcian
      this.container.add(this.player) // kontener w którym jest player
    }
    this.axes = axes
    if (axes) {
      this.axes = new THREE.AxesHelper(50) // osie konieczne do kontroli kierunku ruchu
      this.container.add(this.axes)
    }

    this.clickedVect = new THREE.Vector3(playerX, 0, playerZ);
    this.directionVect = new THREE.Vector3(0, 0, 0);
    this.setPosition(playerX, playerY, playerZ)
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2()
    this.interval = null
    this.setCamera()
    document.addEventListener('mousedown', this.moveEvent.bind(this))
    document.addEventListener('click', this.clickMove.bind(this))
  }

  setPosition(x, y, z) {
    const mesh = this.getPlayerCont()
    if (mesh) {
      mesh.position.x = x
      mesh.position.y = y / 2
      mesh.position.z = z
    }

  }

  getPlayerCont() {
    return this.container
  }

  getPlayerMesh() {
    if (this.model) {
      return this.modelMesh
    } else {
      return this.player
    }

  }

  clickMove = (event) => {
    this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouseVector, this.camera);

    var intersects = this.raycaster.intersectObjects(this.scene.children);
    //console.log(this.raycaster.intersectObjects(this.scene.children))
    if (intersects.length > 0) {
      this.clickedVect = intersects[0].point
      this.directionVect = this.clickedVect.clone().sub(this.getPlayerCont().position).normalize()
      var angle = Math.atan2(
        this.getPlayerCont().position.clone().x - this.clickedVect.x,
        this.getPlayerCont().position.clone().z - this.clickedVect.z
      )
      this.getPlayerMesh().rotation.y = angle - Math.PI / 2
      if (this.axes) {
        this.axes.rotation.y = angle + Math.PI
      }

    }
  }

  moveEvent(e) {
    console.log("mouseEvent")
    if (this.model) {
      this.animation = "run"
    }
    document.addEventListener('mousemove', this.clickMove)
    const mouseup = () => {
      // if (this.model) {
      //   this.animation = "stand"
      // }
      document.removeEventListener('mousemove', this.clickMove)
      document.removeEventListener('mouseup', mouseup)
    }
    document.addEventListener('mouseup', mouseup)

  }

  renderMove(clock) {
    let prevAnimation = this.animation
    //console.log(this.getPlayerCont().position.clone().distanceTo(this.clickedVect), settings.playerSpeed)
    if (this.getPlayerCont().position.clone().distanceTo(this.clickedVect) > settings.playerSpeed) {
      //console.log("ruch")
      if (this.model) {
        this.animation = "run"
      }
      this.getPlayerCont().translateOnAxis(this.directionVect, settings.playerSpeed)
      this.setCamera()
    } else {
      //this.player.setAnimation("stand", true)
      if (this.model) {
        this.animation = "stand"
      }
    }
    if (this.model) {
      //console.log(this.animation, prevAnimation !== this.animation ? true : false)
      this.player.setAnimation(this.animation, prevAnimation !== this.animation ? true : false)
      this.player.updateModel(clock)
    }
  }

  setCamera() {
    this.camera.position.x = this.getPlayerCont().position.x
    this.camera.position.z = this.getPlayerCont().position.z + 250
    this.camera.position.y = this.getPlayerCont().position.y + 250
    this.camera.lookAt(this.getPlayerCont().position)
  }
}

export default Player