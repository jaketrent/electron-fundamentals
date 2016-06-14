const spawn = require('child_process').spawn
const fs = require('fs')
const path = require('path')
const shell = require('electron').shell

let images = []

const logErr = err => err && console.error(err)

exports.getDirPath = app => path.join(app.getPath('pictures'), 'photobombth')

exports.mkdir = picturesPath => {
  fs.stat(picturesPath, (err, stats) => {
    if (err && err.code !== 'ENOENT')
      return logError(err)
    else if (err || !stats.isDirectory())
      fs.mkdir(picturesPath, logError)
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
  images = [imgPath].concat(images)
  return images
}

exports.getFromCache = index => {
  return images[index]
}

const openCmds = {
  darwin: 'open',
  win32: 'explorer',
  linux: 'nautlius'
}

exports.openDir = dirPath => {
  const cmd = openCmds[process.platform]
  if (cmd)
    spawn(cmd, [ dirPath ])
  else
    shell.showItemInFolder(dirPath)
}
