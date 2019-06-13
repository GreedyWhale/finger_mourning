import renderer from '../renderer/index'
import Box from '../objects/block/box'
import Cylinder from '../objects/block/cylinder'

export default class GamePage {
  constructor () {
    this.renderer = renderer
  }
  init () {
    this.renderer.init()
    this.addBlock()
    this.render()
  }
  addBlock () {
    const box = new Box(-15, 0, 0)
    const cylinder = new Cylinder(20, 0, 0)
    this.renderer.scene.add(box.instance)
    this.renderer.scene.add(cylinder.instance)
  }
  render () {
    this.renderer.render()
    requestAnimationFrame(() => { this.render() })
  }
}
