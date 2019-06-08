import GamePage from '../pages/game_page'
import GameOverPage from '../pages/game_over_page'

class GameView {
  initGamePage (callbacks) {
    this.gamePage = new GamePage(callbacks)
    this.gamePage.init()
  }
  initGameOverPage (callbacks) {
    this.gameOverPage = new GameOverPage(callbacks)
    this.gameOverPage.init()
  }
  showGameOverPage () {
    this.gamePage.hide()
    this.gameOverPage.show()
  }
  showGamePage () {
    this.gameOverPage.hide()
    this.restartGame()
    this.gamePage.show()
  }
  restartGame () {
    this.gamePage.restart()
  }
}

export default new GameView()
