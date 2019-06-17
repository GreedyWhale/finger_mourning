import animation from '../utils/animation'

class Light {
  constructor () {
    this.instances = {}
    this.shadowTarget = null
  }

  init () {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    const shadowLight = this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.3)
    shadowLight.position.set(10, 30, 20)
    shadowLight.castShadow = true
    var basicMaterial = new THREE.MeshBasicMaterial({ color: 0xF5f5f5 })
    this.shadowTarget = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), basicMaterial)
    this.shadowTarget.visible = false
    shadowLight.target = this.shadowTarget
    shadowLight.shadow.camera.near = 0.5
    shadowLight.shadow.camera.far = 500
    shadowLight.shadow.camera.left = -100
    shadowLight.shadow.camera.right = 100
    shadowLight.shadow.camera.bottom = -100
    shadowLight.shadow.camera.top = 100
    shadowLight.shadow.mapSize.width = 1024
    shadowLight.shadow.mapSize.height = 1024

    this.instances.ambientLight = ambientLight
    this.instances.shadowLight = shadowLight
    this.instances.shadowTarget = this.shadowTarget
  }

  updatePosition (targetPosition) {
    animation(this.shadowTarget.position, { x: targetPosition.x, y: targetPosition.y, z: targetPosition.z }, 0.5, 'linear', ({ x, y, z }, done) => {
      if (done) { return }
      this.shadowTarget.position.set(x, y, z)
    })
    animation(this.shadowLight.position, { x: 10 + targetPosition.x, y: 30 + targetPosition.y, z: 20 + targetPosition.z }, 0.5, 'linear', ({ x, y, z }, done) => {
      if (done) { return }
      this.shadowLight.position.set(x, y, z)
    })
  }

  reset () {
    this.shadowLight.position.set(10, 30, 20)
    this.shadowTarget.position.set(0, 0, 0)
  }
}

export default new Light()
