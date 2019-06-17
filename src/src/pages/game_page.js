import renderer from '../renderer/index'
import Box from '../objects/block/box'
import Cylinder from '../objects/block/cylinder'
import piece from '../objects/piece.js'
import { initCoordinates } from '../../configs/coordinate_config'

export default class GamePage {
  constructor () {
    this.piece = piece
    this.renderer = renderer
    this.currentBlock = null
    this.targetPosition = {
      x: 23,
      y: 0,
      z: 0
    }
    this.axis = null
  }
  init () {
    this.renderer.init()
    this.addPiece()
    this.addBlock()
    this.bindTouchEvent()
    this.render()
  }
  addBlock () {
    const box = new Box(initCoordinates.x, initCoordinates.y, initCoordinates.z)
    const cylinder = new Cylinder(20, 0, 0)
    this.currentBlock = box
    this.renderer.scene.add(box.instance)
    this.renderer.scene.add(cylinder.instance)
    this.setDirection('x')
  }
  addPiece () {
    this.piece.init()
    this.renderer.scene.add(this.piece.pieceContainer)
    this.piece.comeDown()
  }
  render () {
    this.piece && this.piece.update()
    this.currentBlock && this.currentBlock.update()
    this.renderer.render()
    requestAnimationFrame(() => { this.render() })
  }
  bindTouchEvent () {
    wx.onTouchStart(() => {
      this.touchStartTime = Date.now()
      this.piece.setStatus('shrink')
      this.currentBlock.setStatus('shrink')
    })
    wx.onTouchEnd(() => {
      this.touchEndTime = Date.now()
      const duration = this.touchEndTime - this.touchStartTime
      this.piece.velocity.vx = Math.min(duration / 6, 400)
      this.piece.velocity.vx = +this.piece.velocity.vx.toFixed(2)
      this.piece.velocity.vy = Math.min(150 + duration / 20, 400)
      this.piece.velocity.vy = +this.piece.velocity.vy.toFixed(2)
      this.piece.stop()
      this.piece.rotate()
      this.currentBlock.rebound()
      this.piece.setStatus('jump')
    })
  }
  setDirection (direction) {
    const currentPosition = {
      x: this.piece.pieceContainer.position.x,
      z: this.piece.pieceContainer.position.z
    }
    this.axis = new THREE.Vector3(this.targetPosition.x - currentPosition.x, 0, this.targetPosition.z - currentPosition.z)
    this.axis.normalize()
    this.piece.setDirection(direction, this.axis)
  }
}
