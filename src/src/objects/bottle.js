/* global GameGlobal */
import bottleConfig from '../../configs/bottle_config'
import blockConfig from '../../configs/block_config'
import animation from '../utils/animation'

class Bottle {
  constructor () {
    this.instance = null
  }
  init () {
    this.instance = new GameGlobal.THREE.Object3D()
    this.instance.position.set(bottleConfig.initPosition.x, bottleConfig.initPosition.y + 30, bottleConfig.initPosition.z)
    this.bottle = new GameGlobal.THREE.Object3D()
    this.human = new GameGlobal.THREE.Object3D()
    const radius = 2.1168
    const { specularTexture, middleTexture, bottomTexture } = this.loadTexture()

    this.head = new GameGlobal.THREE.Mesh(
      new GameGlobal.THREE.OctahedronGeometry(radius),
      new GameGlobal.THREE.MeshBasicMaterial({ map: bottomTexture })
    )
    this.head.castShadow = true
    const topGeometry = new GameGlobal.THREE.SphereGeometry(radius / 1.4, 20, 20)
    topGeometry.scale(1, 0.54, 1)
    const top = new GameGlobal.THREE.Mesh(
      topGeometry,
      new GameGlobal.THREE.MeshBasicMaterial({ map: specularTexture })
    )
    top.castShadow = true
    const middle = new GameGlobal.THREE.Mesh(
      new GameGlobal.THREE.CylinderGeometry(
        radius / 1.4, radius / 1.4 * 0.88, 1.2 * radius, 20
      ),
      new GameGlobal.THREE.MeshBasicMaterial({ map: middleTexture })
    )
    middle.castShadow = true
    const bottom = new GameGlobal.THREE.Mesh(
      new GameGlobal.THREE.CylinderGeometry(
        0.62857 * radius, 0.907143 * radius, 1.91423 * radius, 20
      ),
      new GameGlobal.THREE.MeshBasicMaterial({ map: bottomTexture })
    )
    middle.bottom = true
    const body = new GameGlobal.THREE.Object3D()
    this.head.position.y = 3.57143 * radius
    top.position.y = 1.8143 * radius
    middle.position.y = 1.3857 * radius
    body.add(top)
    body.add(middle)
    body.add(bottom)
    this.human.add(this.head)
    this.human.add(body)
    this.bottle.add(this.human)
    this.bottle.position.y = 2.1
    this.instance.add(this.bottle)
  }
  loadTexture () {
    this.loader = new GameGlobal.THREE.TextureLoader()
    const specularTexture = this.loader.load('/game/public/images/bottle_head.png')
    const bottomTexture = this.loader.load('/game/public/images/bottle_bottom.png')
    const middleTexture = this.loader.load('/game/public/images/bottle_top.png')
    return { specularTexture, bottomTexture, middleTexture }
  }
  update () {
    this.head.rotation.y += 0.06
  }
  showUp () {
    animation(this.instance.position, {
      x: bottleConfig.initPosition.x,
      y: bottleConfig.initPosition.y + blockConfig.height / 2,
      z: bottleConfig.initPosition.z
    }, 1, 'bounceEaseOut', ({ x, y, z }) => {
      this.instance.position.set(x, y, z)
    })
  }
}

export default new Bottle()
