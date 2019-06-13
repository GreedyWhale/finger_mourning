import gameView from './view'

class GameController {
  constructor () {
    this.gameView = gameView
  }

  initPages () {
    this.gameView.initGamePage()
  }
}

export default new GameController()
