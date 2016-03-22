exports.init = doc => {
  return {
    video: doc.getElementById('video'),
    canvas: doc.getElementById('canvas'),
    record: doc.getElementById('record'),
    photos: doc.getElementById('photos'),
    counter: doc.getElementById('counter')
  }
}
