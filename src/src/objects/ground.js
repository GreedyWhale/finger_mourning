/* global  GameGlobal */

class Ground {
  constructor () {
    this.instance = null
  }
  init () {
    const groundGeometry = new GameGlobal.THREE.PlaneGeometry(200, 200)
    const groundMaterial = new GameGlobal.THREE.ShadowMaterial({
      color: 0x000000,
      opacity: 0.3
    })
    this.instance = new GameGlobal.THREE.Mesh(groundGeometry, groundMaterial)
    this.instance.rotateX(-Math.PI / 2)
    this.instance.position.y = (-16 / 3.2)
    this.instance.receiveShadow = true
  }
}

export default new Ground()
