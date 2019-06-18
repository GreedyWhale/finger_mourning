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
  }
}
