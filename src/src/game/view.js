import GamePage from '../pages/game_page'
import GameOverPage from '../pages/game_over_page'

class GameView {
  constructor () {
    this.gamePage = null
  }
  restartGame () {
    this.gameOverPage.hide()
    this.gamePage.restart()
  }

  initGameOverPage () {
    this.gameOverPage = new GameOverPage()
    this.gameOverPage.init({
      camera: this.gamePage.renderer.camera.cameraInstance
    })
  }

  initGamePage () {
    this.gamePage = new GamePage()
    this.gamePage.init()
  }

  showGameOverPage () {
    this.gamePage.hide()
    this.gameOverPage.show()
  }

  showGamePage () {
    this.gameOverPage.hide()
    this.gamePage.restart()
  }
}

export default new GameView()
