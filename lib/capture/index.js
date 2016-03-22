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

function handleSuccess(stream) {
	if (window.URL)
		video.src = window.URL.createObjectURL(stream)
	else
		video.src = stream
}

function handleError(error) {
	console.log('Camera error: ', error.code)
}

function handleRecord(ctx, canvas) {
  ctx.drawImage(video, 0, 0)
  const img = new Image()
  img.classList.add('photo')
  img.src = canvas.toDataURL('image/png')
  return img
}

function countDown(num, done) {
  const counter = document.getElementById('counter')
  for (let i = 0; i <= num; ++i) {
    setTimeout(_ => {
      const count = num - i
      counter.innerHTML = count > 0 ? count : ''
      if (i === num)
        done()
    }, i * 1000)
  }
}

window.addEventListener('DOMContentLoaded', _ => {
  const video = document.getElementById('video')
  const canvas = document.getElementById('canvas')
  const record = document.getElementById('record')
  const photos = document.querySelector('.photosContainer')

  const ctx = canvas.getContext('2d')

	navigator.getUserMedia(videoMediaConstraints, handleSuccess, handleError)

  record.addEventListener('click', _ => {
    countDown(3, _ => photos.appendChild(handleRecord(ctx, canvas)))
  }, false)
}, false)
