import tween from './tween'

let animationId = -1
let stoppedAnimationId = animationId - 1

const doAnimation = (from, to, duration, type = 'linear', callback = () => {}) => {
  const selfAnimationId = ++animationId
  const intervalReference = 17
  const frames = Math.round((duration * 1000 / intervalReference))
  let { x: currentX = 0, y: currentY = 0, z: currentZ = 0 } = from
  const { x: toX = 0, y: toY = 0, z: toZ = 0 } = to
  let currentFrame = 0
  let lastTime = Date.now()
  const tweenFn = tween[type]
  const step = function () {
    const currentTime = Date.now()
    const interval = currentTime - lastTime
    if (interval <= intervalReference) {
      currentFrame += 1
    } else {
      currentFrame += Math.round((interval / intervalReference))
    }
    const result = {
      x: tweenFn(currentFrame, currentX, toX - currentX, frames),
      y: tweenFn(currentFrame, currentY, toY - currentY, frames),
      z: tweenFn(currentFrame, currentZ, toZ - currentZ, frames)
    }
    if ((currentFrame <= frames) && (selfAnimationId > stoppedAnimationId)) {
      callback(result)
      requestAnimationFrame(step)
    } else if ((currentFrame > frames) && (selfAnimationId > stoppedAnimationId)) {
      callback(to, 'done')
    }
    lastTime = Date.now()
  }
  step()
}

export const animation = (from, to, duration, type = 'linear', callback = () => {}, delay = 0) => {
  setTimeout(() => {
    doAnimation(from, to, duration, type, callback)
  }, delay * 1000)
}

export const stopAllAnimation = () => {
  stoppedAnimationId = animationId
}
