const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    width: 1200
  })

  mainWindow.loadURL(`file://${__dirname}/capture/index.html`)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', _ => {
    mainWindow = null
  })
})
