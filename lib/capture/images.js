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

exports.save = (picturesPath, contents) => {
  fs.writeFile(path.join(picturesPath, `${new Date()}.png`), contents, logErr)
}
