import { scene } from '../scene/index'
import Cuboid from '../block/cuboid'
import Cylinder from '../block/cylinder'
import ground from '../objects/ground'
import bottle from '../objects/bottle'
import blockConfig from '../../configs/block_config'
export default class GamePage {
  constructor (callbacks) {
    this.callbacks = callbacks
    this.targetPosition = null
  }
  init () {
    this.scene = scene
    this.ground = ground
    this.bottle = bottle
    this.scene.init()
    this.ground.init()
    this.bottle.init()
    this.addInitBlock()
    this.addGround()
    this.addBottle()
    this.bindTouchEvent()
    this.render()
  }
  render () {
    if (this.bottle) {
      this.bottle.update()
    }
    if (this.currentBlock) {
      this.currentBlock.update()
    }
    this.scene.render()
    requestAnimationFrame(() => {
      this.render()
    })
  }
  addInitBlock () {
    const cuboidBlock = new Cuboid(-15, 0, 0)
    const cylinderBlock = new Cylinder(20, 0, 0)
    this.currentBlock = cuboidBlock
    this.scene.instance.add(cuboidBlock.instance)
    this.scene.instance.add(cylinderBlock.instance)
    const initDirection = 0
    this.targetPosition = {
      x: 23,
      y: 0,
      z: 0
    }
    this.setDirection(initDirection)
  }
  restart () {
    console.log('game page restart')
  }
  show () {
    // this.mesh.visible = true
  }
  hide () {
    // this.mesh.visible = false
  }
  addGround () {
    this.scene.instance.add(this.ground.instance)
  }
  addBottle () {
    this.scene.instance.add(this.bottle.instance)
    this.bottle.showUp()
  }
  bindTouchEvent () {
    wx.onTouchStart(() => {
      this.touchStartTime = Date.now()
      this.bottle.shrink()
      this.currentBlock.shrink()
    })
    wx.onTouchEnd(() => {
      this.touchEndTime = Date.now()
      const duration = this.touchEndTime - this.touchStartTime
      this.bottle.velocity.vx = Math.min(duration / 6, 400)
      this.bottle.velocity.vx = +this.bottle.velocity.vx.toFixed(2)
      this.bottle.velocity.vy = Math.min(150 + duration / 20, 400)
      this.bottle.velocity.vy = +this.bottle.velocity.vy.toFixed(2)
      this.bottle.stop()
      this.bottle.rotate()
      this.currentBlock.rebound()
      this.bottle.jump()
    })
  }
  setDirection (direction) {
    const currentPosition = {
      x: this.bottle.instance.position.x,
      z: this.bottle.instance.position.z
    }
    this.axis = new GameGlobal.THREE.Vector3(this.targetPosition.x - currentPosition.x, 0, this.targetPosition.z - currentPosition.z)
    this.axis.normalize()
    this.bottle.setDirection(direction, this.axis)
  }
}
