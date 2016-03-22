const videoMediaConstraints = {
  audio: false,
  video: {
    mandatory: {
      minWidth: 853,
      minHeight: 480,
      maxWidth: 853,
      maxHeight: 480
    }
  }
}

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia

function attachVideoSrc(video, stream) {
	if (window.URL)
		video.src = window.URL.createObjectURL(stream)
	else
		video.src = stream
}

function handleCameraError(error) {
	console.log('Camera error: ', error.code)
}

function capturePhoto(video, ctx, canvas) {
  ctx.drawImage(video, 0, 0)
  const img = new Image()
  img.classList.add('photo')
  img.src = canvas.toDataURL('image/png')
  return img
}

function countDown(counter, from, onCount, done) {
  for (let i = 0; i <= from; ++i) {
    setTimeout(_ => {
      const count = from - i
      onCount(counter, count)
      if (i === from)
        done()
    }, i * 1000)
  }
}

function setCounter(counter, count) {
  counter.innerHTML = count > 0 ? count : ''
}

window.addEventListener('DOMContentLoaded', _ => {
  const video = document.getElementById('video')
  const canvas = document.getElementById('canvas')
  const record = document.getElementById('record')
  const photos = document.querySelector('.photosContainer')
  const counter = document.getElementById('counter')

  const ctx = canvas.getContext('2d')

	navigator.getUserMedia(videoMediaConstraints, stream => attachVideoSrc(video, stream), handleCameraError)

  record.addEventListener('click', _ => {
    countDown(counter, 3, setCounter, _ => photos.appendChild(capturePhoto(video, ctx, canvas)))
  }, false)
}, false)
