import './libs/weapp-adapter'
import * as THREE from './libs/three'
import controller from './src/game/controller'

GameGlobal.THREE = THREE
controller.initPages()
