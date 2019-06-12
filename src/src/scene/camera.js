/* global GameGlobal */
import sceneConfig from '../../configs/scene_config'

class Camera {
  constructor () {
    this.instance = null
  }

  init () {
    const ratio = window.innerHeight / window.innerWidth
    this.instance = new GameGlobal.THREE.OrthographicCamera(
      -sceneConfig.frustumSize,
      sceneConfig.frustumSize,
      sceneConfig.frustumSize * ratio,
      -sceneConfig.frustumSize * ratio,
      -100,
      85)
    this.instance.position.set(-10, 10, 10)
    this.target = new GameGlobal.THREE.Vector3(0, 0, 0)
    this.instance.lookAt(this.target)
  }
}

export default new Camera()
