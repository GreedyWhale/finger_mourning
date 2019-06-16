const Tween = {
  linear (t, b, c, d) {
    return c * t / d + b
  },
  quadEaseIn (t, b, c, d) {
    return c * (t /= d) * t + b
  },
  quadEaseOut (t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b
  },
  quadEaseInOut (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b
    return -c / 2 * (--t * (t - 2) - 1) + b
  },
  cubiCeaseIn (t, b, c, d) {
    return c * (t /= d) * t * t + b
  },
  cubicEaseOut (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  },
  cubicEaseInOut (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b
    return c / 2 * ((t -= 2) * t * t + 2) + b
  },
  quartEaseIn (t, b, c, d) {
    return c * (t /= d) * t * t * t + b
  },
  quartEaseOut (t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b
  },
  quartEaseInOut (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b
  },
  quintEaseIn (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b
  },
  quintEaseOut (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  },
  quintEaseInOut (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
  },
  sineEaseIn (t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
  },
  sineEaseOut (t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b
  },
  sineEaseInOut (t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
  },
  expoEaseIn (t, b, c, d) {
    return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
  },
  expoEaseOut (t, b, c, d) {
    return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
  },
  expoEaseInOut (t, b, c, d) {
    if (t === 0) return b
    if (t === d) return b + c
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
  },
  circEaseIn (t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
  },
  circEaseOut (t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
  },
  circEaseInOut (t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
  },
  elasticEaseIn (t, b, c, d, a, p) {
    var s
    if (t === 0) return b
    if ((t /= d) === 1) return b + c
    if (typeof p === 'undefined') p = d * 0.3
    if (!a || a < Math.abs(c)) {
      s = p / 4
      a = c
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a)
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
  },
  elasticEaseOut (t, b, c, d, a, p) {
    var s
    if (t === 0) return b
    if ((t /= d) === 1) return b + c
    if (typeof p === 'undefined') p = d * 0.3
    if (!a || a < Math.abs(c)) {
      a = c
      s = p / 4
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a)
    }
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
  },
  elasticEaseInOut (t, b, c, d, a, p) {
    var s
    if (t === 0) return b
    if ((t /= d / 2) === 2) return b + c
    if (typeof p === 'undefined') p = d * (0.3 * 1.5)
    if (!a || a < Math.abs(c)) {
      a = c
      s = p / 4
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a)
    }
    if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b
  },
  backEaseIn (t, b, c, d, s) {
    if (typeof s === 'undefined') s = 1.70158
    return c * (t /= d) * t * ((s + 1) * t - s) + b
  },
  backEaseOut (t, b, c, d, s) {
    if (typeof s === 'undefined') s = 1.70158
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
  },
  backEaseInOut (t, b, c, d, s) {
    if (typeof s === 'undefined') s = 1.70158
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
  },
  bounceEaseIn (t, b, c, d) {
    return c - Tween.bounceEaseOut(d - t, 0, c, d) + b
  },
  bounceEaseOut (t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
    }
  },
  bounceEaseInOut (t, b, c, d) {
    if (t < d / 2) {
      return Tween.bounceEaseIn(t * 2, 0, c, d) * 0.5 + b
    } else {
      return Tween.bounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
    }
  }
}

export default Tween
