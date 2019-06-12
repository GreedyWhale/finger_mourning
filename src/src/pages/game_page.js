import { scene } from '../scene/index'
import Cuboid from '../block/cuboid'
import Cylinder from '../block/cylinder'
import ground from '../objects/ground'
import bottle from '../objects/bottle'
export default class GamePage {
  constructor (callbacks) {
    this.callbacks = callbacks
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
    this.render()
  }
  render () {
    if (this.bottle) {
      this.bottle.update()
    }
    this.scene.render()
    requestAnimationFrame(() => {
      this.render()
    })
  }
  addInitBlock () {
    const cuboidBlock = new Cuboid(-15, 0, 0)
    const cylinderBlock = new Cylinder(20, 0, 0)
    this.scene.instance.add(cuboidBlock.instance)
    this.scene.instance.add(cylinderBlock.instance)
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
}
