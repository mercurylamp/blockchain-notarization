import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { format as formatUrl } from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';
let mainWindow = null;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

async function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });
  window.maximize();

  if (isDevelopment) {
    await installExtensions();
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }));
  }

  window.on('closed', () => {
    mainWindow = null;
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  window.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });

  return window;
}

app.commandLine.appendSwitch('lang', 'EN');

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow();
});
