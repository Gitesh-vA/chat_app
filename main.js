const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

require('@electron/remote/main').initialize();

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: false
    }
  })

  win.loadURL(
    // isDev
    //   ? 'https://chat-app-flame-rho.vercel.app/'
       `file://${path.join(__dirname, '../build/index.html')}`
    // 'https://chat-p370dmpld-gitesh-developers-projects.vercel.app'
  )

  win.webContents.openDevTools();
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

  win.setMenu(null);
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
});
