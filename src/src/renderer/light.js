const light = () => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
  directionalLight.position.set(10, 30, 20) // 设置光源的位置
  directionalLight.castShadow = true // 产生动态阴影

  directionalLight.shadow.camera.near = 0.5
  directionalLight.shadow.camera.far = 500
  directionalLight.shadow.camera.left = -100
  directionalLight.shadow.camera.right = 100
  directionalLight.shadow.camera.top = 100
  directionalLight.shadow.camera.bottom = -100
  directionalLight.shadow.mapSize.width = 1024
  directionalLight.shadow.mapSize.height = 1024
  return {
    ambientLight: new THREE.AmbientLight(0xffffff, 0.8),
    directionalLight
  }
}
export default light
