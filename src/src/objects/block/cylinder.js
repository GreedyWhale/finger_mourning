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
    const colors = this.randomColors()
    const innerMaterial = new THREE.MeshLambertMaterial({ color: colors[0] })
    const outerMaterial = new THREE.MeshLambertMaterial({ color: colors[1] })

    const innerHeight = 3
    const outerHeight = (this.height - innerHeight) / 2
    const outerGeometry = new THREE.CylinderGeometry(this.width / 2, this.width / 2, outerHeight, 120)
    const innerGeometry = new THREE.CylinderGeometry(this.width / 2, this.width / 2, innerHeight, 120)

    const totalMesh = new THREE.Object3D()
    const topMesh = new THREE.Mesh(outerGeometry, outerMaterial)
    topMesh.position.y = (innerHeight + outerHeight) / 2
    topMesh.receiveShadow = true
    topMesh.castShadow = true
    const middleMesh = new THREE.Mesh(innerGeometry, innerMaterial)
    middleMesh.receiveShadow = true
    middleMesh.castShadow = true
    const bottomMesh = new THREE.Mesh(outerGeometry, outerMaterial)
    bottomMesh.position.y = -(innerHeight + outerHeight) / 2
    bottomMesh.receiveShadow = true
    bottomMesh.castShadow = true
    totalMesh.add(topMesh)
    totalMesh.add(middleMesh)
    totalMesh.add(bottomMesh)
    this.instance = totalMesh
    this.instance.name = 'block'
    this.instance.position.set(this.x, this.y, this.z)
  }
}
