/* global GameGlobal */
import sceneConfig from '../../configs/scene_config'

class Background {
  constructor () {
    this.instance = null
  }
  init () {
    const backgroundGeometry = new GameGlobal.THREE.PlaneGeometry(
      sceneConfig.frustumSize * 2,
      window.innerHeight / window.innerWidth * sceneConfig.frustumSize * 2
    )
    const backgroundMaterial = new GameGlobal.THREE.MeshBasicMaterial({
      color: 0xd7dbe6
    })
    this.instance = new GameGlobal.THREE.Mesh(backgroundGeometry, backgroundMaterial)
  }
}

export default new Background()
