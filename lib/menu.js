const electron = require('electron')

const app = electron.app
const shell = electron.shell

module.exports = _ => {
  const template = [

    {
      label: 'Effects',
      submenu: [
        {
          label: 'Cycle',
          accelerator: '',
          click: _ => {}
        },
        {
          type: 'separator'
        },
        {
          label: 'Vanilla',
          accelerator: '',
          click: _ => {}
        },
        {
          label: 'Ascii',
          accelerator: '',
          click: _ => {}
        },
        {
          label: 'Night Vision',
          accelerator: '',
          click: _ => {}
        },
        {
          label: 'Scan Lines',
          accelerator: '',
          click: _ => {}
        },
        {
          label: 'Vignette',
          accelerator: '',
          click: _ => {}
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Photos Directory',
          accelerator: '',
          click: _ => {}
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
