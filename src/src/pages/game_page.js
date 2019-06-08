/* global GameGlobal */
export default class GamePage {
  constructor (callbacks) {
    this.callbacks = callbacks
  }
  init () {
    const width = window.innerWidth
    const height = window.innerHeight
    const renderer = new GameGlobal.THREE.WebGLRenderer({
      // eslint-disable-next-line no-undef
      canvas
    })

    const scene = new GameGlobal.THREE.Scene()

    const camera = new GameGlobal.THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, -1000, 1000)

    renderer.setClearColor(new GameGlobal.THREE.Color('rgb(0, 0, 0)'))
    renderer.setSize(width, height)

    const triangleShape = new GameGlobal.THREE.Shape()
    triangleShape.moveTo(0, 100)
    triangleShape.lineTo(-100, -100)
    triangleShape.lineTo(100, -100)
    triangleShape.lineTo(0, 100)

    const geometry = new GameGlobal.THREE.ShapeGeometry(triangleShape)
    const material = new GameGlobal.THREE.MeshBasicMaterial({
      color: new GameGlobal.THREE.Color('rgb(0, 255, 0)'),
      side: GameGlobal.THREE.DoubleSide
    })

    const mesh = new GameGlobal.THREE.Mesh(geometry, material)
    this.mesh = mesh
    mesh.position.set(0, 0, 1)
    mesh.visible = false
    scene.add(mesh)

    camera.position.set(0, 0, 0)
    camera.lookAt(new GameGlobal.THREE.Vector3(0, 0, 1))
    const render = () => {
      mesh.rotateY(0.05)
      renderer.render(scene, camera)
      // requestAnimationFrame(render)
    }

    render()
  }
  restart () {
    console.log('game page restart')
  }
  show () {
    this.mesh.visible = true
  }
  hide () {
    this.mesh.visible = false
  }
}
