import blockConfig from '../../../configs/block_config'
import { animation } from '../../utils/animation'

export default class BaseBlock {
  constructor (type) {
    this.type = type
    this.height = blockConfig.height
    this.width = blockConfig.width
    this.scale = 1
    this.colors = [
      0xFFB6C1, 0xDC143C,
      0xBA55D3, 0x8A2BE2,
      0x000080, 0x1E90FF,
      0x008080, 0x40E0D0,
      0x3CB371, 0x32CD32,
      0xFFFF00, 0xFFD700,
      0xFFA500, 0xFF4500
    ]
  }
  update () {
    if (this.status === 'shrink') {
      this.shrink()
    }
  }
  setStatus (status) {
    this.status = status
  }
  shrink () {
    const DELTA_SCALE = 0.005
    const MIN_SCALE = 0.55
    this.scale -= DELTA_SCALE
    this.scale = Math.max(MIN_SCALE, this.scale)
    if (this.scale <= MIN_SCALE) {
      this.status = 'stop'
      return
    }
    this.instance.scale.y = this.scale
    const deltaY = this.height * DELTA_SCALE / 2
    this.instance.position.y -= deltaY
  }
  rebound () {
    this.status = 'stop'
    this.scale = 1
    animation(this.instance.scale, { y: 1 }, 0.5, 'elasticEaseOut', ({ y }, done) => {
      if (done) { return }
      this.instance.scale.y = y
    })
    animation(this.instance.position, { y: 0 }, 0.5, 'elasticEaseOut', ({ y }, done) => {
      if (done) { return }
      this.instance.position.y = y
    })
  }

  getVertices () {
    const vertices = []
    const centerPosition = {
      x: this.instance.position.x,
      z: this.instance.position.z
    }
    vertices.push([centerPosition.x + this.width / 2, centerPosition.z + this.width / 2])
    vertices.push([centerPosition.x + this.width / 2, centerPosition.z - this.width / 2])
    vertices.push([centerPosition.x - this.width / 2, centerPosition.z - this.width / 2])
    vertices.push([centerPosition.x - this.width / 2, centerPosition.z + this.width / 2])
    return vertices
  }

  randomColors () {
    let first = Math.floor(Math.random() * this.colors.length)
    let second = Math.floor(Math.random() * this.colors.length)
    while (second === first) {
      second = Math.floor(Math.random() * this.colors.length)
    }
    return [this.colors[first], this.colors[second]]
  }
}
