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
  img.src = canvas.toDataURL('image/jpg')
  return img
}

window.addEventListener('DOMContentLoaded', _ => {
  const video = document.getElementById('video')
  const canvas = document.getElementById('canvas')
  const record = document.getElementById('record')
  const photos = document.querySelector('.photosContainer')

  const ctx = canvas.getContext('2d')

	const constraints = {
	  audio: false,
	  video: true
	}
	navigator.getUserMedia(constraints, handleSuccess, handleError)

  record.addEventListener('click', _ => photos.appendChild(handleRecord(ctx, canvas)), false)
}, false)
