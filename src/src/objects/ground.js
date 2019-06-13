const ground = () => {
  const groundGeometry = new THREE.PlaneGeometry(200, 200)
  const groundMaterial = new THREE.ShadowMaterial({
    color: 0x000000,
    opacity: 0.3
  })
  const instance = new THREE.Mesh(groundGeometry, groundMaterial)
  instance.rotateX(-Math.PI / 2)
  instance.position.y = -5
  instance.receiveShadow = true

  return instance
}

export default ground
