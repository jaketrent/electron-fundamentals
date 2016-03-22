const video = require('./video')
const view = require('./view')
const countdown = require('./countdown')

window.addEventListener('DOMContentLoaded', _ => {
  const views = view.init(document)

  const ctx = views.canvas.getContext('2d')

  video.init(navigator)

  views.record.addEventListener('click', _ => {
    countdown.start(views.counter, 3, _ => views.photos.appendChild(video.capture(views.video, ctx, views.canvas)))
  }, false)
}, false)
