import eventBus from '../utils/event'
import { GAME_STAGE_CHANGED } from '../utils/constant'

class GameModel {
  constructor () {
    // gameOver game
    this.stage = ''
  }
  getStage () {
    return this.stage
  }
  setStage (stage) {
    this.stage = stage
    eventBus.trigger(GAME_STAGE_CHANGED, stage)
  }
}

export default new GameModel()
