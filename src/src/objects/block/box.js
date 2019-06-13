import Base from './base'

class Box extends Base {
  constructor (x, y, z) {
    super('box')
    this.instance = null
    this.x = x
    this.y = y
    this.z = z
    this.create()
  }
  create () {
    const geometry = new THREE.BoxGeometry(this.width, this.height, this.width)
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff
    })
    this.instance = new THREE.Mesh(geometry, material)
    this.instance.position.set(this.x, this.y, this.z)
  }
}

export default Box
