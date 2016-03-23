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
  const videoEl = document.getElementById('video')
  const canvasEl = document.getElementById('canvas')
  const recordEl = document.getElementById('record')
  const photosEl = document.getElementById('photos')
  const counterEl = document.getElementById('counter')

  const ctx = canvasEl.getContext('2d')

  video.init(navigator)

  recordEl.addEventListener('click', _ => {
    const setCount = count => counterEl.innerHTML = count > 0 ? count : ''
    countdown.start(3, setCount, _ => {
      const bytes = video.captureBytes(videoEl, ctx, canvasEl)
      ipc.send('image-captured', bytes)
      photosEl.appendChild(formatImgTag(document, bytes))
    })
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
