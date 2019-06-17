import { initCoordinates } from '../../configs/coordinate_config'
import animation from '../utils/animation'
import blockConfig from '../../configs/block_config'
class Piece {
  constructor () {
    this.radius = 2.1168
    this.pieceContainer = null
    this.head = null
    this.body = null
    this.parent = null
    this.wrapper = null
    this.color = 0xff0000
    this.direction = 'x'
    this.scale = 1
  }
  init () {
    this.pieceContainer = new THREE.Object3D()
    this.parent = new THREE.Object3D()
    this.wrapper = new THREE.Object3D()
    this.pieceContainer.position.set(
      initCoordinates.x,
      initCoordinates.y + 40,
      initCoordinates.z
    )

    this.head = this.createHead()
    this.body = this.createBody()
    this.parent.add(this.head)
    this.parent.add(this.body)
    this.wrapper.add(this.parent)
    this.wrapper.position.y = 2.1
    this.pieceContainer.add(this.wrapper)
  }

  createHead () {
    const head = new THREE.Mesh(
      new THREE.OctahedronGeometry(this.radius),
      new THREE.MeshPhongMaterial({ color: this.color })
    )
    head.position.y = 3.57143 * this.radius
    head.castShadow = true
    return head
  }

  createBody () {
    const body = new THREE.Object3D()

    const topGeometry = new THREE.SphereGeometry(this.radius / 1.4, 20, 20)
    topGeometry.scale(1, 0.3, 1)
    const top = new THREE.Mesh(
      topGeometry,
      new THREE.MeshPhongMaterial({ color: this.color })
    )
    const middle = new THREE.Mesh(
      new THREE.CylinderGeometry(this.radius / 1.4, this.radius / 1.4 * 0.88, this.radius * 1.2, 20),
      new THREE.MeshPhongMaterial({ color: this.color })
    )

    const bottom = new THREE.Mesh(
      new THREE.CylinderGeometry(this.radius * 0.62857, this.radius * 0.907143, this.radius * 1.91423, 20),
      new THREE.MeshPhongMaterial({ color: this.color })
    )
    top.position.y = 1.8143 * this.radius
    middle.position.y = 1.3857 * this.radius

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
    if (this.status === 'shrink') {
      this.shrink()
    }
  }

  comeDown () {
    animation(this.pieceContainer.position, {
      x: initCoordinates.x,
      y: initCoordinates.y + blockConfig.height / 2,
      z: initCoordinates.z
    }, 1, 'bounceEaseOut', ({ x, y, z }, done) => {
      if (done) { return }
      this.pieceContainer.position.set(x, y, z)
    })
  }

  rotate () {
    if (this.direction === 'x') {
      animation({ z: 0 }, { z: -Math.PI }, 0.14, 'linear', ({ z }, done) => {
        if (done) { return }
        this.parent.rotation.z = z
      })
      animation(this.parent.rotation, { z: -2 * Math.PI }, 0.18, 'linear', ({ z }, done) => {
        if (done) { return }
        this.parent.rotation.z = z
      }, 0.14)
    }
    if (this.direction === 'z') {
      animation({ x: 0 }, { x: -Math.PI }, 0.14, 'linear', ({ x }, done) => {
        if (done) { return }
        this.parent.rotation.x = x
      })
    }
  }
  setStatus (status) {
    this.status = status
  }
  shrink () {
    // const DELTA_SCALE = 0.005
    // const HORIZON_DELTA_SCALE = 0.007
    // const HEAD_DELTA = 0.03
    // const MIN_SCALE = 0.55
    // this.scale -= DELTA_SCALE
    // this.scale = Math.max(MIN_SCALE, this.scale)
    // if (this.scale <= MIN_SCALE) {
    //   return
    // }

    // this.body.scale.y = this.scale
    // this.body.scale.x += HORIZON_DELTA_SCALE
    // this.body.scale.z += HORIZON_DELTA_SCALE
    // this.head.position.y -= HEAD_DELTA
    // const bottleDeltaY = HEAD_DELTA / 2
    // const deltaY = blockConfig.height * DELTA_SCALE / 2
    // this.instance.position.y -= (bottleDeltaY + deltaY * 2)
  }
}

export default new Piece()
