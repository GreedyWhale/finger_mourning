import renderer from '../renderer/index'
import Box from '../objects/block/box'
import Cylinder from '../objects/block/cylinder'
import piece from '../objects/piece.js'
import { initCoordinates } from '../../configs/coordinate_config'

export default class GamePage {
  constructor () {
    this.piece = piece
    this.renderer = renderer
  }
  init () {
    this.renderer.init()
    this.addBlock()
    this.addPiece()
    this.render()
  }
  addBlock () {
    const box = new Box(initCoordinates.x, initCoordinates.y, initCoordinates.z)
    const cylinder = new Cylinder(20, 0, 0)
    this.renderer.scene.add(box.instance)
    this.renderer.scene.add(cylinder.instance)
  }
  addPiece () {
    this.piece.init()
    this.renderer.scene.add(this.piece.pieceContainer)
  }
  render () {
    this.piece && this.piece.update()
    this.renderer.render()
    requestAnimationFrame(() => { this.render() })
  }
}
