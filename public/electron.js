const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // const url = `file://${path.join(__dirname, '../build/index.html')}`;
  const url = isDev ? 'https://pos-frontend-git-master-buddhiisuru.vercel.app' : `file://${path.join(__dirname, '../build/index.html')}`;
  // mainWindow.loadFile("index.js");
  mainWindow.loadURL(url);

  // Auto-print after the page loads
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.print({ silent: true, printBackground: true });
    // app.quit(); // Optionally, close the app after printing
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.allowRendererProcessReuse = true;


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
