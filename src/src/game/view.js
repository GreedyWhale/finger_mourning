import GamePage from '../pages/game_page'

class GameView {
  constructor () {
    this.gamePage = null
  }
  initGamePage () {
    this.gamePage = new GamePage()
    this.gamePage.init()
  }
}

export default new GameView()
