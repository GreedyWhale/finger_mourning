const scene = () => {
  const sceneInstance = new THREE.Scene()
  const axesHelper = new THREE.AxesHelper(100)
  sceneInstance.add(axesHelper)

  return sceneInstance
}

export default scene
