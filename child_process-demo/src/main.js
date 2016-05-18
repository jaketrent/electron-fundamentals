const electron = require('electron')

const { app, BrowserWindow } = electron

let mainWindow

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 200
  })

  mainWindow.loadURL(`file://${__dirname}/status.html`)

  mainWindow.openDevTools()

  mainWindow.on('close', _ => {
    mainWindow = null
  })
})
