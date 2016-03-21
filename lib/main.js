const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null

app.on('ready', _ => {
  mainWindow = new BrowserWindow()

  mainWindow.on('closed', _ => {
    mainWindow = null
  })
})
