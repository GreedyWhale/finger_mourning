import gameController from './controller'

class Game {
  constructor () {
    this.gameController = gameController
  }
  init () {
    this.gameController.initPages()
  }
}

export default new Game()
