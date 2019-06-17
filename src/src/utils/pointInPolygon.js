export default {
  pointInPolygon (point, vs) {
    // get source code from https://github.com/substack/point-in-polygon
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    let x = point[0]; let y = point[1]

    let inside = false
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      let xi = vs[i][0]; let yi = vs[i][1]
      let xj = vs[j][0]; let yj = vs[j][1]

      let intersect = ((yi > y) !== (yj > y)) &&
              (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      if (intersect) inside = !inside
    }

    return inside
  },

  mapUv (textureWidth, textureHeight, geometry, faceIdx, x1, y1, x2, y2, flag) {
    let tileUvW = 1 / textureWidth
    let tileUvH = 1 / textureHeight
    if (geometry.faces[faceIdx] instanceof THREE.Face3) {
      let UVs = geometry.faceVertexUvs[0][faceIdx * 2]
      if (faceIdx === 4 && !flag) {
        UVs[0].x = x1 * tileUvW; UVs[0].y = y1 * tileUvH
        UVs[2].x = x1 * tileUvW; UVs[2].y = y2 * tileUvH
        UVs[1].x = x2 * tileUvW; UVs[1].y = y1 * tileUvH
      } else {
        UVs[0].x = x1 * tileUvW; UVs[0].y = y1 * tileUvH
        UVs[1].x = x1 * tileUvW; UVs[1].y = y2 * tileUvH
        UVs[2].x = x2 * tileUvW; UVs[2].y = y1 * tileUvH
      }
      UVs = geometry.faceVertexUvs[0][faceIdx * 2 + 1]
      if (faceIdx === 4 && !flag) {
        UVs[2].x = x1 * tileUvW; UVs[2].y = y2 * tileUvH
        UVs[1].x = x2 * tileUvW; UVs[1].y = y2 * tileUvH
        UVs[0].x = x2 * tileUvW; UVs[0].y = y1 * tileUvH
      } else {
        UVs[0].x = x1 * tileUvW; UVs[0].y = y2 * tileUvH
        UVs[1].x = x2 * tileUvW; UVs[1].y = y2 * tileUvH
        UVs[2].x = x2 * tileUvW; UVs[2].y = y1 * tileUvH
      }
    }
  }
}
