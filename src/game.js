/* global GameGlobal */
import './libs/weapp-adapter'
import * as THREE from './libs/three'
import Main from './src/main'

GameGlobal.THREE = THREE

Main.init()
