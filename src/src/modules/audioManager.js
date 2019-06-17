import audioConf from '../../configs/audio_config'
import gameView from '../game/view'

class AudioManager {
  constructor () {
    this.init()
  }

  init () {
    for (let key in audioConf.audioSources) {
      this[key] = wx.createInnerAudioContext()
      this[key].src = audioConf.audioSources[key]
    }
    this.shrink_end.loop = true
    this.shrink.onEnded(() => {
      if (gameView.gamePage.piece.status === 'shrink') {
        this.shrink_end.play()
      }
    })
  }
}

export default new AudioManager()
