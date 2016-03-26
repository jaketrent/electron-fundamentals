const electron = require('electron')

const countdown = require('./countdown')
const effects = require('./effects')
const flash = require('./flash')
const video = require('./video')

let canvasTarget
const ipc = electron.ipcRenderer
const remote = electron.remote
let seriously
const shell = electron.shell
let videoSrc

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
  const flashEl = document.getElementById('flash')

  seriously = new Seriously()
  videoSrc = seriously.source('#video')
  canvasTarget = seriously.target('#canvas')
  effects.choose(seriously, videoSrc, canvasTarget)

  video.init(navigator)

  recordEl.addEventListener('click', _ => {
    recordEl.setAttribute('disabled', 'disabled')
    const setCount = count => counterEl.innerHTML = count > 0 ? count : ''
    countdown.start(3, setCount, _ => {
      flash(flashEl)
      const bytes = video.captureBytesFromLiveCanvas(canvasEl)
      ipc.send('image-captured', bytes)
      photosEl.insertBefore(formatImgTag(document, bytes), photosEl.firstChild)
      recordEl.removeAttribute('disabled')
    })
  }, false)

  // TODO: move to images mod?
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

ipc.on('effect-cycle', evt => {
  effects.cycle(seriously, videoSrc, canvasTarget)
})

ipc.on('effect-choose', (evt, effectName) => {
  effects.choose(seriously, videoSrc, canvasTarget, effectName)
})
