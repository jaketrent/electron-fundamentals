const electron = require('electron')

const countdown = require('./countdown')
const video = require('./video')

const ipc = electron.ipcRenderer
const remote = electron.remote
const shell = electron.shell

const images = remote.require('./images')

const formatImgTag = (doc, bytes) => {
  const div = doc.createElement('div')
  div.classList.add('photo')
  const close = doc.createElement('div')
  close.classList.add('photoClose')
  const img = new Image()
  img.classList.add('photoImg')
  img.src = bytes
  div.appendChild(img)
  div.appendChild(close)
  return div
}

window.addEventListener('DOMContentLoaded', _ => {
  const canvasEl = document.getElementById('canvas')
  const recordEl = document.getElementById('record')
  const photosEl = document.getElementById('photos')
  const counterEl = document.getElementById('counter')

  const seriously = new Seriously()
  const videoSrc = seriously.source('#video')
  const canvasTarget = seriously.target('#canvas')

  // raw
  canvasTarget.source = videoSrc

  // const vignette = seriously.effect('vignette')
  // vignette.amount = 2
  // vignette.source = videoSrc
  // canvasTarget.source = vignette

  // const ascii = seriously.effect('ascii')
  // ascii.source = videoSrc
  // canvasTarget.source = ascii

  // const nightvision = seriously.effect('nightvision')
  // nightvision.source = videoSrc
  // canvasTarget.source = nightvision

  // const scanlines = seriously.effect('scanlines')
  // scanlines.lines = 10000
  // scanlines.size = 0.2
  // scanlines.intensity = 0.8
  // scanlines.source = videoSrc
  // canvasTarget.source = scanlines

  seriously.go()

  video.init(navigator)

  recordEl.addEventListener('click', _ => {
    const setCount = count => counterEl.innerHTML = count > 0 ? count : ''
    // TODO: re-enable countdown
    // countdown.start(3, setCount, _ => {
      const bytes = video.captureBytesFromLiveCanvas(canvasEl)
      ipc.send('image-captured', bytes)
      photosEl.appendChild(formatImgTag(document, bytes))
    // })
  }, false)

  photosEl.addEventListener('click', evt => {
    const isRm = evt.target.classList.contains('photoClose')
    const selector = isRm ? '.photoClose' : '.photoImg'

    const photos = Array.from(document.querySelectorAll(selector))
    const index = photos.findIndex(el => el == evt.target)

    if (index > -1) {
      if (isRm)
        ipc.send('image-remove', index)
      else
        shell.showItemInFolder(images.getFromCache(index))
    }
  })
}, false)

ipc.on('image-removed', (evt, index) => {
  document.getElementById('photos').removeChild(Array.from(document.querySelectorAll('.photo'))[index])
})
