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

function attachVideoSrc(video, stream) {
	if (window.URL)
		video.src = window.URL.createObjectURL(stream)
	else
		video.src = stream
}

function handleCameraError(error) {
	console.log('Camera error: ', error.code)
}

exports.init = nav => {
  nav.getUserMedia = nav.getUserMedia ||
      nav.webkitGetUserMedia || nav.mozGetUserMedia

  nav.getUserMedia(videoMediaConstraints, stream => attachVideoSrc(video, stream), handleCameraError)
}

exports.capture = (video, ctx, canvas) => {
  ctx.drawImage(video, 0, 0)
  const img = new Image()
  img.classList.add('photo')
  img.src = canvas.toDataURL('image/png')
  return img
}
