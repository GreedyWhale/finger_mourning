import Base from './base'

export default class Cylinder extends Base {
  constructor (x, y, z) {
    super('cylinder')
    this.x = x
    this.y = y
    this.z = z
    this.create()
  }
  create () {
    const geometry = new THREE.CylinderGeometry(
      this.width / 2, this.width / 2, this.height, 120
    )
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff
    })
    this.instance = new THREE.Mesh(geometry, material)
    this.instance.position.set(this.x, this.y, this.z)
    this.instance.castShadow = true
    this.instance.receiveShadow = true
  }
}
