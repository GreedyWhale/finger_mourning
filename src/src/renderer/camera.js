import cameraConfig from '../../configs/camera_config'

const camera = () => {
  const ratio = window.innerHeight / window.innerWidth
  const { size } = cameraConfig
  // 设置相机可看到范围
  const cameraInstance = new THREE.OrthographicCamera(
    -size, size, size * ratio, -size * ratio, -100, 85
  )

  cameraInstance.position.set(0, 0, 0) // 设置相机位置
  cameraInstance.up.set(0, 1, 0)
  cameraInstance.lookAt(new THREE.Vector3(0, 0, 0)) // 设置相机位置从0, 0, 0望向0, 0, 0

  return cameraInstance
}

export default camera
