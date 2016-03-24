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
	console.error('Camera error: ', error.code)
}

exports.init = nav => {
  nav.getUserMedia = nav.getUserMedia ||
      nav.webkitGetUserMedia || nav.mozGetUserMedia

  nav.getUserMedia(videoMediaConstraints, stream => attachVideoSrc(video, stream), handleCameraError)
}

exports.captureBytes = (video, ctx, canvas) => {
  ctx.drawImage(video, 0, 0)
  return canvas.toDataURL('image/png')
}

exports.captureBytesFromLiveCanvas = canvas => {
  return canvas.toDataURL('image/png')
}
