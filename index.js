'use strict';

const Electron = require('electron');

const App = Electron.app;
const IpcMain = Electron.ipcMain;  
const BrowserWindow = Electron.BrowserWindow; 


var mainWindow = null;

App.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

App.on('ready', function() {
  startPage();
});

App.on("activate", function(){
  if(mainWindow == null){
    startPage();
  }
});

App.on('browser-window-blur', function(){
  if(mainWindow){
     mainWindow.webContents.send('browser-window-blur');
  }
});

function startPage(){
    mainWindow = new BrowserWindow({
      width: 1000, 
      height: 700
    });

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  }); 
}

