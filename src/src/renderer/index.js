import camera from './camera'
import scene from './scene'

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
  }

  render () {
    this.instance.render(this.scene, this.camera)
  }
}

export default new Renderer()
