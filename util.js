/* Util functions */
function setGradient(x, y, w, h, c1, c2, axis) {

  noFill()

  if (axis == Y_AXIS) {
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1)
      let c = lerpColor(c1, c2, inter)
      stroke(c)
      line(x, i, x + w, i)
    }
  } else if (axis == X_AXIS) {
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1)
      let c = lerpColor(c1, c2, inter)
      stroke(c)
      line(i, y, i, y + h)
    }
  }
}

