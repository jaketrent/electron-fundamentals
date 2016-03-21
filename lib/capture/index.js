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

window.addEventListener('DOMContentLoaded', _ => {
  const video = document.getElementById('video')

	const constraints = {
	  audio: false,
	  video: true
	}

	navigator.getUserMedia(constraints, handleSuccess, handleError)
}, false)
