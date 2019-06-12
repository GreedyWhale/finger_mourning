import blockConfig from '../../configs/block_config'

export default class BaseBlock {
  constructor (type) {
    this.type = type
    this.height = blockConfig.height
    this.width = blockConfig.width
  }
}
