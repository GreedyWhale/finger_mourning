/* global GameGlobal */

class Light {
  constructor () {
    this.instance = null
  }
  init () {
    const shadowLight = new GameGlobal.THREE.DirectionalLight(0xffffff, 0.3)
    shadowLight.position.set(10, 30, 20)
    // const shadowLightTargetGeometry = new GameGlobal.THREE.PlaneGeometry(0, 0)
    // const shadowLightTargetMaterial = new GameGlobal.THREE.MeshBasicMaterial({ color: 0xffffff })
    // const shadowLightTarget = new GameGlobal.THREE.Mesh(shadowLightTargetGeometry, shadowLightTargetMaterial)
    // shadowLightTarget.visible = false
    // shadowLight.target = shadowLightTarget
    shadowLight.castShadow = true
    shadowLight.shadow.camera.near = 0.5
    shadowLight.shadow.camera.far = 500
    shadowLight.shadow.camera.left = -100
    shadowLight.shadow.camera.right = 100
    shadowLight.shadow.camera.top = 100
    shadowLight.shadow.camera.bottom = -100
    shadowLight.shadow.mapSize.width = 1024
    shadowLight.shadow.mapSize.height = 1024
    this.instance = {
      ambientLight: new GameGlobal.THREE.AmbientLight(0xffffff, 0.8),
      shadowLight
    }
  }
}

export default new Light()
