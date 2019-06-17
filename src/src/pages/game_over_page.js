import cameraConfig from '../../configs/camera_config'
import eventBus from '../utils/event'
import { RESTART_GAME } from '../utils/constant'

export default class GameOverPage {
  constructor () {
    this.instance = null
    this.onTouchEnd = this.onTouchEnd.bind(this)
  }

  show () {
    this.instance.visible = true
    this.bindTouchEvent()
  }

  hide () {
    this.instance.visible = false
    this.removeTouchEvent()
  }

  init (options) {
    this.initGameoverCanvas(options)
  }

  initGameoverCanvas (options) {
    const aspect = window.innerHeight / window.innerWidth
    this.region = [
      (window.innerWidth - 200) / 2,
      (window.innerWidth - 200) / 2 + 200,
      (window.innerHeight - 100) / 2,
      (window.innerHeight - 100) / 2 + 100
    ]
    this.camera = options.camera
    this.canvas = document.createElement('canvas')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.texture = new THREE.Texture(this.canvas)
    this.material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true })
    this.geometry = new THREE.PlaneGeometry(cameraConfig.size * 2, aspect * cameraConfig.size * 2)
    this.instance = new THREE.Mesh(this.geometry, this.material)
    this.instance.position.z = 20
    this.context = this.canvas.getContext('2d')
    this.context.fillStyle = '#333'
    this.context.fillRect((window.innerWidth - 200) / 2, (window.innerHeight - 100) / 2, 200, 100)
    this.context.fillStyle = '#eee'
    this.context.font = '20px Georgia'
    this.context.fillText('Game Over', (window.innerWidth - 200) / 2 + 50, (window.innerHeight - 100) / 2 + 55)
    this.texture.needsUpdate = true
    this.instance.visible = false
    this.camera.add(this.instance)
  }

  bindTouchEvent () {
    canvas.addEventListener('touchend', this.onTouchEnd)
  }

  removeTouchEvent () {
    canvas.removeEventListener('touchend', this.onTouchEnd)
  }

  onTouchEnd (e) {
    const pageX = e.changedTouches[0].pageX
    const pageY = e.changedTouches[0].pageY
    if (pageX > this.region[0] && pageX < this.region[1] && pageY > this.region[2] && pageY < this.region[3]) {
      eventBus.trigger(RESTART_GAME)
    }
  }
}
