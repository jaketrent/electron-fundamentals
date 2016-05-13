const electron = require('electron')
const path = require('path')

const app = electron.app
const Menu = electron.Menu
const Tray = electron.Tray

app.on('ready', _ => {
  const tray = new Tray(path.join('src', 'trayIcon.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Wow',
      click: _ => console.log('wow')
    },
    {
      label: 'Awesome',
      click: _ => console.log('awesome')
    }
  ])
  tray.setToolTip('Woweeee')
  tray.setContextMenu(contextMenu)
})
