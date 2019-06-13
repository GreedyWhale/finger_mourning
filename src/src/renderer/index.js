import camera from './camera'
import scene from './scene'
import background from '../objects/background'

class Renderer {
  constructor () {
    this.camera = null
    this.scene = null
  }
  init () {
    this.camera = camera()
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
    this.scene.add(this.camera)
    this.camera.add(background())
  }

  render () {
    this.instance.render(this.scene, this.camera)
  }
}

export default new Renderer()
