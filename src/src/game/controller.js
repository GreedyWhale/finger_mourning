import gameView from './view'
import gameModel from './model'
import eventBus from '../utils/event'
import { GAME_STAGE_CHANGED } from '../utils/constant'

class GameController {
  constructor () {
    this.gameView = gameView
    this.gameModel = gameModel
    this.initListeners()
  }
  initPages () {
    const gamePageCallbacks = {
      showGameOverPage: () => this.gameView.showGameOverPage()
    }
    const gameOverPageCallbacks = {
      gameRestart: () => this.gameView.restartGame()
    }
    this.gameView.initGamePage(gamePageCallbacks)
    this.gameView.initGameOverPage(gameOverPageCallbacks)
    setTimeout(() => {
      this.gameModel.setStage('game')
    }, 2000)
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
  }
}

export default new GameController()
