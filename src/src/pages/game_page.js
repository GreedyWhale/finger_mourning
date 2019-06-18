import renderer from '../renderer/index'
import Box from '../objects/block/box'
import Cylinder from '../objects/block/cylinder'
import piece from '../objects/piece.js'
import { initCoordinates } from '../../configs/coordinate_config'
import gameConfig from '../../configs/game_config'
import pieceConfig from '../../configs/piece_config'
import blockConfig from '../../configs/block_config'
import pointInPolygonMethods from '../utils/pointInPolygon'
import eventBus from '../utils/event'
import { SET_GAME_STAGE, GAME_PAGE_CAN_TOUCH } from '../utils/constant'
import ScoreText from '../objects/score/index'
import audioManager from '../modules/audioManager'
import { stopAllAnimation } from '../utils/animation'

const HIT_NEXT_BLOCK_CENTER = 1
const HIT_CURRENT_BLOCK = 2
const GAME_OVER_NEXT_BLOCK_BACK = 3
const GAME_OVER_CURRENT_BLOCK_BACK = 4
const GAME_OVER_NEXT_BLOCK_FRONT = 5
const GAME_OVER_BOTH = 6
const HIT_NEXT_BLOCK_NORMAL = 7
export default class GamePage {
  constructor () {
    this.piece = piece
    this.renderer = renderer
    this.currentBlock = null
    this.checkingHit = false
    this.disabled = true
    this.targetPosition = {}
    this.axis = null
    this.scoreText = null
    this.score = 0
    this.combo = 0
    this.initListeners()
  }
  init () {
    this.scoreText = new ScoreText()
    this.scoreText.init({
      fillStyle: 0x666699
    })
    this.renderer.init()
    this.addPiece()
    this.addBlock()
    this.addScore()
    this.bindTouchEvent()
    this.render()
  }
  addBlock () {
    this.targetPosition = {
      x: 23,
      y: 0,
      z: 0
    }
    const box = new Box(initCoordinates.x, initCoordinates.y, initCoordinates.z)
    const cylinder = new Cylinder(23, 0, 0)
    this.currentBlock = box
    this.nextBlock = cylinder
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
    this.checkingHit && this.checkingPieceHit()
    this.renderer.render()

    requestAnimationFrame(() => { this.render() })
  }
  bindTouchEvent () {
    wx.onTouchStart(() => {
      if (this.disabled) { return }
      this.touchStartTime = Date.now()
      this.piece.setStatus('shrink')
      this.currentBlock.setStatus('shrink')
      audioManager.shrink.play()
    })
    wx.onTouchEnd(() => {
      if (this.disabled || !this.touchStartTime) { return }
      this.touchEndTime = Date.now()
      const duration = this.touchEndTime - this.touchStartTime
      this.piece.velocity.vx = Math.min(duration / 6, 400)
      this.piece.velocity.vx = +this.piece.velocity.vx.toFixed(2)
      this.piece.velocity.vy = Math.min(150 + duration / 20, 400)
      this.piece.velocity.vy = +this.piece.velocity.vy.toFixed(2)
      this.piece.stop()
      const initY = (1 - this.currentBlock.instance.scale.y) * blockConfig.height
      this.hit = this.getHitStatus(this.piece, this.currentBlock, this.nextBlock, initY)
      this.checkingHit = true
      this.piece.rotate()
      this.currentBlock.rebound()
      this.piece.setStatus('jump')
      audioManager.shrink.stop()
      audioManager.shrink_end.stop()
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
  getHitStatus (piece, currentBlock, nextBlock, initY) {
    let flyingTime = parseFloat(piece.velocity.vy) / parseFloat(gameConfig.gravity) * 2.0
    initY = initY || piece.pieceContainer.position.y.toFixed(2)
    var time = +((piece.velocity.vy - Math.sqrt(Math.pow(piece.velocity.vy, 2) - 2 * initY * gameConfig.gravity)) / gameConfig.gravity).toFixed(2)
    flyingTime -= time
    flyingTime = +flyingTime.toFixed(2)
    const destination = []
    const bottlePosition = new THREE.Vector2(piece.pieceContainer.position.x, piece.pieceContainer.position.z)
    const translate = new THREE.Vector2(this.axis.x, this.axis.z).setLength(piece.velocity.vx * flyingTime)
    bottlePosition.add(translate)
    piece.destination = [+bottlePosition.x.toFixed(2), +bottlePosition.y.toFixed(2)]
    destination.push(+bottlePosition.x.toFixed(2), +bottlePosition.y.toFixed(2))

    let result1, result2
    if (nextBlock) {
      const nextDiff = Math.pow(destination[0] - nextBlock.instance.position.x, 2) + Math.pow(destination[1] - nextBlock.instance.position.z, 2)
      const nextPolygon = nextBlock.getVertices()
      if (pointInPolygonMethods.pointInPolygon(destination, nextPolygon)) {
        if (Math.abs(nextDiff) < 5) {
          result1 = HIT_NEXT_BLOCK_CENTER
        } else {
          result1 = HIT_NEXT_BLOCK_NORMAL
        }
      } else if (pointInPolygonMethods.pointInPolygon([destination[0] - pieceConfig.bodyWidth / 2, destination[1]], nextPolygon) || pointInPolygonMethods.pointInPolygon([destination[0], destination[1] + pieceConfig.bodyWidth / 2], nextPolygon)) {
        result1 = GAME_OVER_NEXT_BLOCK_BACK
      } else if (pointInPolygonMethods.pointInPolygon([destination[0] + pieceConfig.bodyWidth / 2, destination[1]], nextPolygon) || pointInPolygonMethods.pointInPolygon([destination[0], destination[1] - pieceConfig.bodyWidth / 2], nextPolygon)) {
        result1 = GAME_OVER_NEXT_BLOCK_FRONT
      }
    }

    if (currentBlock) {
      const currentPolygon = currentBlock.getVertices()
      if (pointInPolygonMethods.pointInPolygon(destination, currentPolygon)) {
        result2 = HIT_CURRENT_BLOCK
      } else if (pointInPolygonMethods.pointInPolygon([destination[0] - pieceConfig.bodyWidth / 2, destination[1]], currentPolygon) || pointInPolygonMethods.pointInPolygon([destination[0], destination[1] + pieceConfig.bodyWidth / 2], currentPolygon)) {
        if (result1) {
          result2 = GAME_OVER_BOTH
        }
        result2 = GAME_OVER_CURRENT_BLOCK_BACK
      }
    }
    return result1 || result2 || 0
  }
  checkingPieceHit () {
    if (this.piece.pieceContainer.position.y <= blockConfig.height / 2 && this.piece.status === 'jump' && this.piece.flyingTime > 0.3) {
      this.checkingHit = true
      if (this.hit === HIT_NEXT_BLOCK_CENTER || this.hit === HIT_NEXT_BLOCK_NORMAL || this.hit === HIT_CURRENT_BLOCK) {
        this.piece.stop()
        this.piece.pieceContainer.position.y = blockConfig.height / 2
        this.piece.pieceContainer.position.x = this.piece.destination[0]
        this.piece.pieceContainer.position.z = this.piece.destination[1]
        if (this.hit === HIT_NEXT_BLOCK_CENTER || this.hit === HIT_NEXT_BLOCK_NORMAL) {
          if (this.hit === HIT_NEXT_BLOCK_CENTER) {
            this.combo++
            audioManager['combo' + (this.combo <= 8 ? this.combo : '8')].play()
            this.score += 2 * this.combo
            this.updateScore(this.score)
          } else if (this.hit === HIT_NEXT_BLOCK_NORMAL) {
            this.combo = 0
            audioManager.success.play()
            this.updateScore(++this.score)
          }
          this.updateNextBlock()
        }
      } else { // game over
        this.combo = 0
        this.checkingHit = false
        this.disabled = true
        if (this.hit === GAME_OVER_NEXT_BLOCK_BACK || this.hit === GAME_OVER_CURRENT_BLOCK_BACK) {
          stopAllAnimation()
          this.piece.stop()
          this.piece.forerake()
          audioManager.fall_from_block.play()
          this.piece.pieceContainer.position.y = blockConfig.height / 2
          setTimeout(() => {
            // this.uploadScore()
            eventBus.trigger(SET_GAME_STAGE, 'gameOver')
          }, 1500)
        } else if (this.hit === GAME_OVER_NEXT_BLOCK_FRONT) {
          stopAllAnimation()
          this.piece.stop()
          this.piece.hypsokinesis()
          audioManager.fall_from_block.play()
          this.piece.pieceContainer.position.y = blockConfig.height / 2
          setTimeout(() => {
            // this.uploadScore()
            eventBus.trigger(SET_GAME_STAGE, 'gameOver')
          }, 1500)
        } else {
          stopAllAnimation()
          this.piece.stop()
          this.piece.straight()
          audioManager.fall.play()
          this.piece.pieceContainer.position.y = blockConfig.height / 2
          setTimeout(() => {
            // this.uploadScore()
            eventBus.trigger(SET_GAME_STAGE, 'gameOver')
          }, 1500)
        }
      }
    }
  }
  updateNextBlock () {
    const seed = Math.round(Math.random())
    const type = seed ? 'box' : 'cylinder'
    const direction = Math.round(Math.random()) > 0 ? 'z' : 'x'
    const distance = Math.round(Math.random() * 20) + 20
    this.currentBlock = this.nextBlock
    const targetPosition = this.targetPosition = {}
    if (direction === 'x') {
      targetPosition.x = this.currentBlock.instance.position.x + distance
      targetPosition.y = this.currentBlock.instance.position.y
      targetPosition.z = this.currentBlock.instance.position.z
    } else if (direction === 'z') {
      targetPosition.x = this.currentBlock.instance.position.x
      targetPosition.y = this.currentBlock.instance.position.y
      targetPosition.z = this.currentBlock.instance.position.z - distance
    }
    this.setDirection(direction)
    if (type === 'box') {
      this.nextBlock = new Box(targetPosition.x, targetPosition.y, targetPosition.z)
    } else {
      this.nextBlock = new Cylinder(targetPosition.x, targetPosition.y, targetPosition.z)
    }
    this.renderer.scene.add(this.nextBlock.instance)
    const cameraTargetPosition = {
      x: (this.currentBlock.instance.position.x + this.nextBlock.instance.position.x) / 2,
      y: (this.currentBlock.instance.position.y + this.nextBlock.instance.position.y) / 2,
      z: (this.currentBlock.instance.position.z + this.nextBlock.instance.position.z) / 2
    }

    this.renderer.updateCameraPosition(cameraTargetPosition)
  }

  hide () {
    this.disabled = true
    this.piece.stop()
  }

  restart () {
    this.deleteObjectsfromScene()
    this.piece.reset()
    this.renderer.reset()
    this.score = 0
    this.updateScore(0)
    this.touchStartTime = 0
    this.addBlock()
    this.addPiece()
  }

  deleteObjectsfromScene () {
    let blocks = this.renderer.scene.getObjectByName('block')
    while (blocks) {
      this.renderer.scene.remove(blocks)
      if (blocks.geometry) {
        blocks.geometry.dispose()
      }
      if (blocks.material) {
        blocks.material.dispose()
      }
      blocks = this.renderer.scene.getObjectByName('block')
    }
    this.renderer.scene.remove(this.piece.pieceContainer)
    // this.renderer.scene.remove(this.renderer.ground.instance)
  }

  initListeners () {
    eventBus.on(GAME_PAGE_CAN_TOUCH, (disabled) => {
      this.disabled = disabled
    })
  }

  addScore () {
    this.renderer.addScore(this.scoreText.instance)
  }

  updateScore (score) {
    this.scoreText.updateScore(score)
    this.renderer.updateScore(this.scoreText.instance)
  }
}
