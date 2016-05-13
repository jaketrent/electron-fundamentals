const electron = require('electron')

const app = electron.app
const clipboard = electron.clipboard
const globalShortcut = electron.globalShortcut
const Tray = electron.Tray

const ITEM_MAX_LENGTH = 20
const STACK_SIZE = 5

function addToStack(item, stack = []) {
  return [item].concat(stack.slice(0, stack.length - 1))
}

function formatItem(item) {
  return item && item.length > ITEM_MAX_LENGTH
    ? item.substr(0, ITEM_MAX_LENGTH)
    : item
}

function formatMenuTemplateForStack(clipboard, stack) {
  return stack.map(item => ({
    label: `Copy: ${formatItem(item)}`,
    click: _ => clipboard.writeText(item)
  }))
}

app.on('ready', _ => {
  // register copy shortcut
  // capture selected text to stack
  // register paste shortcut per register in stack
  // set tray context menus based on current registers
  const tray = new Tray()
  let stack
  globalShortcut.register('CmdOrCtrl+C', _ => {
    stack = addToStack('TODOcapture', stack)
    tray.setContextMenu(formatMenuTemplateForStack(clipboard, stack))
  })
})
