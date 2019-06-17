import gameView from './view'
import gameModel from './model'
import eventBus from '../utils/event'
import { GAME_STAGE_CHANGED, RESTART_GAME } from '../utils/constant'

class GameController {
  constructor () {
    this.gameView = gameView
    this.gameModel = gameModel
    this.initListeners()
  }

  initPages () {
    this.gameView.initGamePage()
    this.gameView.initGameOverPage()
  }
  initListeners () {
    eventBus.on(GAME_STAGE_CHANGED, (stage) => {
      switch (stage) {
        case 'game':
          this.gameView.showGamePage()
          break
        case 'gameOver':
          this.gameView.showGameOverPage()
          break
        default:
          break
      }
    })

    eventBus.on(RESTART_GAME, () => {
      this.gameView.restartGame()
    })
  }
}

export default new GameController()
