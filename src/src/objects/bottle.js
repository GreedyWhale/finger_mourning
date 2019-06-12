import bottleConfig from '../../configs/bottle_config'
import blockConfig from '../../configs/block_config'
import gameConfig from '../../configs/game_config'
import animation from '../utils/animation'

class Bottle {
  constructor () {
    this.instance = null
    this.direction = 1
    this.axis = null
    this.status = 'stop'
    this.scale = 1
    this.velocity = {
      vx: 0, // 水平方向速度
      vy: 0 // 竖直方向速度
    }
    this.flyingTime = 0
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
    this.body = new GameGlobal.THREE.Object3D()
    this.head.position.y = 3.57143 * radius
    top.position.y = 1.8143 * radius
    middle.position.y = 1.3857 * radius
    this.body.add(top)
    this.body.add(middle)
    this.body.add(bottom)
    this.human.add(this.head)
    this.human.add(this.body)
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
    if (this.status === 'shrink') {
      this._shrink()
    } else if (this.status === 'jump') {
      const tickTime = Date.now() - this.lastFrameTime
      this._jump(tickTime)
    }
    this.head.rotation.y += 0.06
    this.lastFrameTime = Date.now()
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

  setDirection (direction, axis) {
    this.direction = direction
    this.axis = axis
  }

  rotate () {
    const scale = 1.4
    this.human.rotation.z = this.human.rotation.x = 0
    if (this.direction === 0) { // x
      animation(this.human.rotation, { z: this.human.rotation.z - Math.PI }, 0.14, 'linear', ({ z }) => {
        this.human.rotation.z = z
      })
      animation(this.human.rotation, { z: this.human.rotation.z - 2 * Math.PI }, 0.18, 'linear', ({ z }) => {
        this.human.rotation.z = z
      }, 0.14)
      animation(this.head.position, {
        y: this.head.position.y + 0.9 * scale,
        x: this.head.position.x + 0.45 * scale }, 0.1, 'linear', ({ x, y, z }) => {
        this.head.position.set(x, y, z)
      })
      animation(this.head.position, {
        y: this.head.position.y - 0.9 * scale,
        x: this.head.position.x - 0.45 * scale }, 0.1, 'linear', ({ x, y, z }) => {
        this.head.position.set(x, y, z)
      }, 0.1)
      animation(this.head.position, { y: 7.56, x: 0 }, 0.15, 'linear', ({ x, y, z }) => {
        this.head.position.set(x, y, z)
      }, 0.25)
      animation(this.body.scale, {
        y: Math.max(scale, 1),
        x: Math.max(Math.min(1 / scale, 1), 0.7),
        z: Math.max(Math.min(1 / scale, 1), 0.7) }, 0.1, 'linear', ({ x, y, z }) => {
        this.body.scale.set(x, y, z)
      })
      animation(this.body.scale, {
        y: Math.min(0.9 / scale, 0.7),
        x: Math.max(scale, 1.2),
        z: Math.max(scale, 1.2) }, 0.1, 'linear', ({ x, y, z }) => {
        this.body.scale.set(x, y, z)
      }, 0.1)
      animation(this.body.scale, { y: 1, x: 1, z: 1 }, 0.3, 'linear', ({ x, y, z }) => {
        this.body.scale.set(x, y, z)
      }, 0.2)
    } else if (this.direction === 1) { // z
      animation(this.human.rotation, { x: this.human.rotation.x - Math.PI }, 0.14, 'linear', ({ x }) => {
        this.human.rotation.x = x
      })
      animation(this.human.rotation, { x: this.human.rotation.x - 2 * Math.PI }, 0.18, 'linear', ({ x }) => {
        this.human.rotation.x = x
      }, 0.14)
      animation(this.head.position, { y: this.head.position.y + 0.9 * scale, z: this.head.position.z - 0.45 * scale }, 0.1, 'linear', ({ y, z }) => {
        this.head.position.y = y
        this.head.position.z = z
      })
      animation(this.head.position, { z: this.head.position.z + 0.45 * scale, y: this.head.position.y - 0.9 * scale }, 0.1, 'linear', ({ z, y }) => {
        this.head.position.y = y
        this.head.position.z = z
      }, 0.1)
      animation(this.head.position, { y: 7.56, z: 0 }, 0.15, 'linear', ({ y, z }) => {
        this.head.position.y = y
        this.head.position.z = z
      }, 0.25)
      animation(this.body.scale, {
        y: Math.max(scale, 1),
        x: Math.max(Math.min(1 / scale, 1), 0.7),
        z: Math.max(Math.min(1 / scale, 1), 0.7) }, 0.05, 'linear', ({ x, y, z }) => {
        this.body.scale.set(x, y, z)
      })
      animation(this.body.scale, {
        y: Math.min(0.9 / scale, 0.7),
        x: Math.max(scale, 1.2),
        z: Math.max(scale, 1.2) }, 0.05, 'linear', ({ x, y, z }) => {
        this.body.scale.set(x, y, z)
      }, 0.1)
      animation(this.body.scale, { y: 1, x: 1, z: 1 }, 0.2, 'linear', ({ x, y, z }) => {
        this.body.scale.set(x, y, z)
      }, 0.2)
    }
  }

  shrink () {
    this.status = 'shrink'
  }
  stop () {
    this.status = 'stop'
    this.flyingTime = 0
    this.scale = 1
  }
  _shrink () {
    const DELTA_SCALE = 0.005
    const HORIZON_DELTA_SCALE = 0.007
    const HEAD_DELTA = 0.03
    const MIN_SCALE = 0.55
    this.scale -= DELTA_SCALE
    this.scale = Math.max(MIN_SCALE, this.scale)
    if (this.scale <= MIN_SCALE) {
      return
    }
    this.body.scale.y = this.scale
    this.body.scale.x += HORIZON_DELTA_SCALE
    this.body.scale.z += HORIZON_DELTA_SCALE
    this.head.position.y -= HEAD_DELTA
    const bottleDeltaY = HEAD_DELTA / 2
    const deltaY = blockConfig.height * DELTA_SCALE / 2
    this.instance.position.y -= (bottleDeltaY + deltaY * 2)
  }

  jump () {
    this.status = 'jump'
  }

  _jump (tickTime) {
    const t = tickTime / 1000
    this.flyingTime = this.flyingTime + t
    const translateH = this.velocity.vx * t
    const translateY = this.velocity.vy * t - 0.5 * gameConfig.gravity * t * t - gameConfig.gravity * this.flyingTime * t
    this.instance.translateY(translateY)
    this.instance.translateOnAxis(this.axis, translateH)
  }
}

export default new Bottle()
