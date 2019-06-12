import BaseBlock from './base'

export default class cylinder extends BaseBlock {
  constructor (x, y, z, width) {
    super('cylinder')
    this.x = x
    this.y = y
    this.z = z
    this.size = this.width || width
    const geometry = new GameGlobal.THREE.CylinderGeometry(this.size / 2, this.size / 2, this.height, 120)
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
