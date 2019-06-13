import light from './light'
import ground from '../objects/ground'

const scene = () => {
  const sceneInstance = new THREE.Scene()
  const axesHelper = new THREE.AxesHelper(100)
  const lights = light()
  Object.keys(lights).forEach(value => {
    sceneInstance.add(lights[value])
  })
  sceneInstance.add(axesHelper)
  sceneInstance.add(ground())
  return sceneInstance
}

export default scene
