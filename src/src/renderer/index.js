import camera from './camera'
import scene from './scene'
import background from '../objects/background'
import ground from '../objects/ground'
import light from './light'

class Renderer {
  constructor () {
    this.camera = null
    this.scene = null
    this.ground = null
    this.lights = null
    this.currentScore = null
  }
  init () {
    this.camera = camera
    this.ground = ground
    this.lights = light
    this.camera.init()
    this.ground.init()
    this.lights.init()
    this.scene = scene()
    const { width, height } = canvas
    if (window.devicePixelRatio) {
      canvas.height = height * window.devicePixelRatio
      canvas.width = width * window.devicePixelRatio
    }
    this.instance = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    })
    this.instance.shadowMap.enabled = true

    Object.keys(this.lights.instances).forEach(value => {
      this.scene.add(this.lights.instances[value])
    })
    this.scene.add(this.ground.instance)
    this.scene.add(this.camera.cameraInstance)
    this.camera.cameraInstance.add(background())
  }

  render () {
    this.instance.render(this.scene, this.camera.cameraInstance)
  }

  updateCameraPosition (targetPosition) {
    this.camera.updatePosition(targetPosition)
    this.lights.updatePosition(targetPosition)
    this.ground.updatePosition(targetPosition)
  }

  reset () {
    this.camera.reset()
    this.lights.reset()
    this.ground.reset()
  }

  addScore (scoreInstance) {
    this.currentScore = scoreInstance
    this.camera.cameraInstance.add(scoreInstance)
    scoreInstance.position.x = -20
    scoreInstance.position.y = 40
  }

  updateScore (scoreInstance) {
    this.camera.cameraInstance.remove(this.currentScore)
    this.currentScore = scoreInstance
    this.camera.cameraInstance.add(scoreInstance)
    scoreInstance.position.x = -20
    scoreInstance.position.y = 40
  }
}

export default new Renderer()
