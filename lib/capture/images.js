const fs = require('fs')
const path = require('path')

const logErr = err => err && console.error(err)

exports.mkdir = picturesPath => {
  fs.stat(picturesPath, (err, stats) => {
    if (err) return logErr(err)

    if (!stats.isDirectory())
      fs.mkdir(picturesPath, logErr)
  })
}

exports.save = (picturesPath, contents, done) => {
  const base64Data = contents.replace(/^data:image\/png;base64,/, '')
  const fileName = `${new Date()}.png`
  const savePath = path.join(picturesPath, fileName)
  fs.writeFile(savePath, base64Data, { encoding: 'base64' }, err => {
    if (err) return logErr(err)
    
    done(null, savePath)
  })
}
