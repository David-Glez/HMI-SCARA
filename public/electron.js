const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            preload: isDev 
                ? path.join(app.getAppPath(), './public/preload.js') 
                : path.join(app.getAppPath(), './build/preload.js'),
            contextIsolation: true
        }
    })

    mainWindow.loadURL(
        isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
    );
    
    mainWindow.setIcon(
        path.join(__dirname, 'favicon.ico')
    );
    
    if(isDev){
        mainWindow.webContents.on('did-frame-finish-load', () => {
            mainWindow.webContents.openDevTools({
                mode: 'detach'
            });
        });
    }
};

app.whenReady().then(() => {
    createWindow()
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if(mainWindow.getAllWindows().length === 0){
        createWindow();
    }
});