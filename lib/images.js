const fs = require('fs')
const path = require('path')

const logErr = err => err && console.error(err)

var images = []

exports.getDirPath = app => path.join(app.getPath('pictures'), 'photobombth')

exports.mkdir = picturesPath => {
  fs.stat(picturesPath, (err, stats) => {
    if (err) return logErr(err)

    if (!stats.isDirectory())
      fs.mkdir(picturesPath, logErr)
  })
}

exports.save = (picturesPath, contents, done) => {
  const base64Data = contents.replace(/^data:image\/png;base64,/, '')
  const fileName = `photo-${new Date().getTime()}.png`
  const imgPath = path.join(picturesPath, fileName)
  fs.writeFile(imgPath, base64Data, { encoding: 'base64' }, err => {
    if (err) return logErr(err)

    done(null, imgPath)
  })
}

exports.rm = (index, done) => {
  fs.unlink(images[index], err => {
    if (err) return logErr(err)

    images.splice(index, 1)
    done()
  })
}

exports.cache = imgPath => {
  images = images.concat([imgPath])
  return images
}

exports.getFromCache = index => {
  return images[index]
}
