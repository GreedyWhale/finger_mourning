import font from './font'

export default class ScoreText {
  constructor () {
    this.material = null
    this.geometryOptions = { font, size: 6, height: 0.1 }
  }

  init (options) {
    this.material = new THREE.MeshBasicMaterial({
      color: (options && options.fillStyle) ? options.fillStyle : 0xffffff,
      transparent: true
    })
    if (options && options.opacity) {
      this.material.opacity = options.opacity
    }
    this.options = options || {}
    const geometry = new THREE.TextGeometry('0', this.geometryOptions)
    this.instance = new THREE.Mesh(geometry, this.material)
    this.instance.name = 'scoreText'
  }

  updateScore (score) {
    const scoreStr = score.toString()
    this.instance.geometry = new THREE.TextGeometry(scoreStr, this.geometryOptions)
  }
}
