const electron = require('electron')

const app = electron.app

app.on('ready', _ => {
  console.log('ready')
})
