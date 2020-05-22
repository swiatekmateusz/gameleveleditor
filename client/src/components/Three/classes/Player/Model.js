import * as THREE from 'three'
import jpg from './model/tris.png'

class Model {

  constructor() {
    this.mixer = null
    this.meshModel = null
  }

  loadModel(callback) {
    try {
      var loader = new THREE.JSONLoader();
      loader.load('/model/tris.js', (geometry) => {
        // for (var i = 0; i < geometry.animations.length; i++) {
        //   console.log(geometry.animations[i].name);
        // }
        const modelMaterial = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(jpg),
          morphTargets: true // ta własność odpowiada za możliwość animowania materiału modelu
        });
        this.meshModel = new THREE.Mesh(geometry, modelMaterial)
        this.mixer = new THREE.AnimationMixer(this.meshModel)
        callback(this.meshModel)
      });

    } catch (error) {
      console.log(error)
    }
  }


  // update mixera
  updateModel(clock) {
    if (this.mixer) {
      const delta = clock.getDelta()
      this.mixer.update(delta)
    }
  }

  //animowanie postaci
  setAnimation(name = "stand", reset = false) {
    //console.log(name)
    if (this.mixer) {
      if (reset) this.mixer.uncacheRoot(this.meshModel)
      //console.log(name)
      this.mixer.clipAction(name).play();
    }
  }
}


export default Model