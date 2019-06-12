/* global GameGlobal */
import BaseBlock from './base'

export default class Cuboid extends BaseBlock {
  constructor (x, y, z, width) {
    super('cuboid')
    this.x = x
    this.y = y
    this.z = z
    this.size = this.width || width
    const geometry = new GameGlobal.THREE.BoxGeometry(this.size, this.height, this.size)
    const material = new GameGlobal.THREE.MeshPhongMaterial({
      color: 0xffffff
    })
    this.instance = new GameGlobal.THREE.Mesh(geometry, material)
    this.instance.name = 'block'
    this.instance.position.set(x, y, z)
    this.instance.receiveShadow = true
    this.instance.castShadow = true
  }
}
