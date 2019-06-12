/* global GameGlobal canvas */
import camera from './camera'
import light from './light'
import background from '../objects/background'

class Scene {
  constructor () {
    this.instance = null
    this.renderer = null
    this.camera = null
  }
  init () {
    const { width, height } = canvas
    if (window.devicePixelRatio) {
      canvas.height = height * window.devicePixelRatio
      canvas.width = width * window.devicePixelRatio
    }
    this.instance = new GameGlobal.THREE.Scene()
    this.renderer = new GameGlobal.THREE.WebGLRenderer({
      canvas,
      antialias: true,
      preserveDrawingBuffer: true
    })

    this.renderer.shadowMap.enabled = true

    this.camera = camera
    this.camera.init()
    this.axesHelper = new GameGlobal.THREE.AxesHelper(100)
    this.light = light
    this.light.init()
    this.instance.add(this.axesHelper)
    this.instance.add(this.camera.instance)
    for (let lightType in this.light.instance) {
      this.instance.add(this.light.instance[lightType])
    }

    this.background = background
    this.background.init()
    this.background.instance.position.z = -84
    this.camera.instance.add(this.background.instance)
  }
  render () {
    this.renderer.render(this.instance, this.camera.instance)
  }
}

export default new Scene()
