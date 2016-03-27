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
  daltonize: (seriously, src, target) => {
    console.log('daltonize!')
    const daltonize = seriously.effect('daltonize')
    daltonize.type = '0.8'
    connectEffect(seriously, src, target, daltonize)
  },
  filmgrain: (seriously, src, target) => {
    const filmgrain = seriously.effect('filmgrain')
    filmgrain.amount = 0.15
    connectEffect(seriously, src, target, filmgrain)
  },
  kaleidoscope: (seriously, src, target) => {
    const kaleidoscope = seriously.effect('kaleidoscope')
    kaleidoscope.segments = 5
    connectEffect(seriously, src, target, kaleidoscope)
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
  vibrance: (seriously, src, target) => {
    const vibrance = seriously.effect('vibrance')
    vibrance.amount = 1
    connectEffect(seriously, src, target, vibrance)
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
