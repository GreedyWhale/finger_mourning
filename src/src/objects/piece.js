import { initCoordinates } from '../../configs/coordinate_config'
class Piece {
  constructor () {
    this.radius = 2
    this.pieceContainer = null
    this.head = null
    this.body = null
    this.color = 0xff0000
  }
  init () {
    this.pieceContainer = new THREE.Object3D()
    this.pieceContainer.position.set(
      initCoordinates.x,
      initCoordinates.y + this.radius * 8.75,
      initCoordinates.z
    )

    this.head = this.createHead()
    this.body = this.createBody()
    this.pieceContainer.add(this.head)
    this.pieceContainer.add(this.body)
  }

  createHead () {
    const head = new THREE.Mesh(
      new THREE.OctahedronGeometry(this.radius),
      new THREE.MeshPhongMaterial({ color: this.color })
    )

    head.castShadow = true
    return head
  }

  createBody () {
    const body = new THREE.Object3D()

    const topGeometry = new THREE.SphereGeometry(this.radius * 1.2, 20, 20)
    topGeometry.scale(1, 0.3, 1)
    const top = new THREE.Mesh(
      topGeometry,
      new THREE.MeshPhongMaterial({ color: this.color })
    )
    const middle = new THREE.Mesh(
      new THREE.CylinderGeometry(this.radius * 1.2, this.radius, this.radius * 1.2, 20, 20),
      new THREE.MeshPhongMaterial({ color: this.color })
    )

    const bottom = new THREE.Mesh(
      new THREE.CylinderGeometry(this.radius, this.radius * 1.4, this.radius * 3, 20, 20),
      new THREE.MeshPhongMaterial({ color: this.color })
    )
    top.position.y = -2 * this.radius
    middle.position.y = -2.7 * this.radius
    bottom.position.y = -4.8 * this.radius

    top.castShadow = true
    middle.castShadow = true
    bottom.castShadow = true

    body.add(top)
    body.add(middle)
    body.add(bottom)
    return body
  }

  update () {
    this.head.rotation.y += 0.06
  }
}

export default new Piece()
