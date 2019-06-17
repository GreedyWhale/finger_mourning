import cameraConfig from '../../configs/camera_config'
import { animation } from '../utils/animation'

class Camera {
  constructor () {
    this.cameraInstance = null
    this.target = null
  }
  init () {
    const ratio = window.innerHeight / window.innerWidth
    const { size } = cameraConfig
    // 设置相机可看到范围
    this.cameraInstance = new THREE.OrthographicCamera(
      -size, size, size * ratio, -size * ratio, -100, 85
    )
    this.target = new THREE.Vector3(0, 0, 0)
    this.cameraInstance.position.set(-10, 10, 10) // 设置相机位置
    this.cameraInstance.up.set(0, 1, 0)
    this.cameraInstance.lookAt(this.target) // 设置相机位置从0, 0, 0望向0, 0, 0
  }

  updatePosition (newTargetPosition) {
    animation(this.cameraInstance.position, { x: newTargetPosition.x - 10, y: newTargetPosition.y + 10, z: newTargetPosition.z + 10 }, 0.5, 'linear', ({ x, y, z }, done) => {
      if (done) { return }
      this.cameraInstance.position.set(x, y, z)
    })
    animation(this.target, { x: newTargetPosition.x, y: newTargetPosition.y, z: newTargetPosition.z }, 0.5, 'linear', ({ x, y, z }, done) => {
      if (done) { return }
      this.target.x = x
      this.target.y = y
      this.target.z = z
    })
  }

  reset () {
    this.cameraInstance.position.set(-10, 10, 10)
    this.target = new THREE.Vector3(0, 0, 0)
    this.cameraInstance.lookAt(this.target)
  }
}
export default new Camera()
