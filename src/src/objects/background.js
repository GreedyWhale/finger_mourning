import cameraConfig from '../../configs/camera_config'

const background = () => {
  const backgroundGeometry = new THREE.PlaneGeometry(
    cameraConfig.size * 2,
    window.innerHeight / window.innerWidth * cameraConfig.size * 2
  )
  const backgroundMaterial = new THREE.MeshBasicMaterial({
    color: 0xd7dbe6
  })
  const instance = new THREE.Mesh(backgroundGeometry, backgroundMaterial)
  instance.position.z = -85

  return instance
}

export default background
