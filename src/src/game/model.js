import eventBus from '../utils/event'
import { GAME_STAGE_CHANGED, SET_GAME_STAGE } from '../utils/constant'

class GameModel {
  constructor () {
    // gameOver game
    this.stage = ''
    this.initListeners()
  }
  getStage () {
    return this.stage
  }
  setStage (stage) {
    this.stage = stage
    eventBus.trigger(GAME_STAGE_CHANGED, stage)
  }
  initListeners () {
    eventBus.on(SET_GAME_STAGE, (stage) => {
      this.setStage(stage)
    })
  }
}

export default new GameModel()
