const electron = require('electron')

const images = require('./images')

const app = electron.app
const shell = electron.shell

function enabledCycledEffect(items) {
  const nonEffectMenuOffset = 2
  const selectedIndex = items.findIndex(item => item.checked)
  const nextIndex = selectedIndex + 1 < items.length ? selectedIndex + 1 : nonEffectMenuOffset
  items[nextIndex].checked = true
}

module.exports = mainWindow => {
  const template = [

    {
      label: 'Effects',
      submenu: [
        {
          label: 'Cycle',
          accelerator: 'Shift+CmdOrCtrl+E',
          click: menuItem => {
            enabledCycledEffect(menuItem.menu.items)
            mainWindow.webContents.send('effect-cycle')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Vanilla',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose')
        },
        {
          label: 'Ascii',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'ascii')
        },
        {
          label: 'Daltonize',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'daltonize')
        },
        {
          label: 'Filmgrain',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'filmgrain')
        },
        {
          label: 'Hex',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'hex')
        },
        {
          label: 'kaleidoscope',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'kaleidoscope')
        },
        {
          label: 'Mirror',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'mirror')
        },
        {
          label: 'Night Vision',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'nightvision')
        },
        {
          label: 'Pixelate',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'pixelate')
        },
        {
          label: 'Ripple',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'ripple')
        },
        {
          label: 'Scan Lines',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'scanlines')
        },
        {
          label: 'Sketch',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'sketch')
        },
        {
          label: 'Vibrance',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'vibrance')
        },
        {
          label: 'Vignette',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'vignette')
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Photos Directory',
          accelerator: '',
          click: _ => images.openDir(images.getDirPath(app))
        },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: (item, focusedWindow) => {
            if (focusedWindow)
              focusedWindow.reload()
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: (_ => {
            if (process.platform == 'darwin')
              return 'Alt+Command+I'
            else
              return 'Ctrl+Shift+I'
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.toggleDevTools()
          }
        },
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ]
    }
  ]

  if (process.platform == 'darwin') {
    var name = app.getName()
    template.unshift({
      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: _ => { app.quit() }
        },
      ]
    })
    var windowMenu = template.find(function(m) { return m.role === 'window' })
    if (windowMenu) {
      windowMenu.submenu.push(
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          role: 'front'
        }
      )
    }
  }

  return template
}
