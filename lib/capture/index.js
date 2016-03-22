const electron = require('electron')

const countdown = require('./countdown')
const video = require('./video')

const ipc = electron.ipcRenderer

window.addEventListener('DOMContentLoaded', _ => {
  const videoEl = document.getElementById('video')
  const canvasEl = document.getElementById('canvas')
  const recordEl = document.getElementById('record')
  const photosEl = document.getElementById('photos')
  const counterEl = document.getElementById('counter')

  const ctx = canvasEl.getContext('2d')

  video.init(navigator)

  recordEl.addEventListener('click', _ => {
    // TODO: re-enable the countdown
    // countdown.start(counterEl, 3, _ => {
      const img = video.capture(videoEl, ctx, canvasEl)
      ipc.send('image-captured', img.src)
      photosEl.appendChild(img)
    // })
  }, false)
}, false)
