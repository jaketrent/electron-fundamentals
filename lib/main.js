const electron = require('electron')
const path = require('path')

const images = require('./capture/images')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

let mainWindow = null

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1400
  })

  mainWindow.loadURL(`file://${__dirname}/capture/index.html`)

  mainWindow.webContents.openDevTools()

  // TODO: mkdir send init msg / call fn
  images.mkdir(getPicturesDir(app))

  mainWindow.on('closed', _ => {
    mainWindow = null
  })
})

function getPicturesDir(app) {
  return path.join(app.getPath('pictures'), 'photobombth')
}

ipc.on('image-captured', (evt, contents) => {
  images.save(getPicturesDir(app), contents)
})
