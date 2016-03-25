function connectEffect(seriously, src, target, effect) {
  effect.source = src
  target.source = effect
  seriously.go()
}

const effects = {
  vanilla: (seriously, src, target) => {
    target.source = src
    seriously.go()
  },
  ascii: (seriously, src, target) => {
    const ascii = seriously.effect('ascii')
    connectEffect(seriously, src, target, ascii)
  },
  nightvision: (seriously, src, target) => {
    const nightvision = seriously.effect('nightvision')
    connectEffect(seriously, src, target, nightvision)
  },
  scanlines: (seriously, src, target) => {
    const scanlines = seriously.effect('scanlines')
    scanlines.lines = 10000
    scanlines.size = 0.2
    scanlines.intensity = 0.8
    connectEffect(seriously, src, target, scanlines)
  },
  vignette: (seriously, src, target) => {
    const vignette = seriously.effect('vignette')
    vignette.amount = 2
    connectEffect(seriously, src, target, vignette)
  }
}

const effectNames = Object.keys(effects)
let currentIndex = 0

function setNextIndex() {
  const nextIndex = currentIndex + 1 < effectNames.length ? currentIndex + 1 : 0
  currentIndex = nextIndex
  return currentIndex
}

function setIndexToEffectIndex(effectName) {
  currentIndex = effectNames.indexOf(effectName)
  return currentIndex
}

exports.choose = (seriously, src, target, effectName = 'vanilla') => {
  effects[effectName](seriously, src, target)
  setIndexToEffectIndex(effectName)
}

exports.cycle = (seriously, src, target) => {
  setNextIndex()
  effects[effectNames[currentIndex]](seriously, src, target)
}
