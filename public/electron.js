const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const ipc = require('electron').ipcMain;
const ByteLength = require('@serialport/parser-byte-length')
const r = require('restructure');
const serialPort = require('./serial/serial-control.js');
const dataBase = require('./database/db-actions.js')

let ports = undefined;
var arduinoResponse;
var arduinoSafetyResponse;

const enableConnection = async() => {
    ports = await serialPort.startConnection();
}
enableConnection();

serialPort.arduino_1.on('open', (error) => {
    const arduino = ports.find(ard => ard.arduino == 1);
    if(error){
        console.log(error);
    }
    arduino.error = error;
    arduino.open = serialPort.arduino_1.isOpen;
})

serialPort.arduino_2.on('open', (error) => {
    const arduino = ports.find(ard => ard.arduino == 2)
    if(error){
        console.log(error)
    }
    arduino.error = error;
    arduino.open = serialPort.arduino_2.isOpen;
})

serialPort.arduino_safety.on('open', (error) => {
    const arduino = ports.find(ard => ard.arduino == 3)
    console.log(arduino)
    if(error){
        console.log(error)
    }
    arduino.error = error;
    arduino.open = serialPort.arduino_safety.isOpen;
})

const Sensors = new r.Struct({
    encoderPos: r.int32le,
    detected: new r.Boolean(r.uint8),
    adcVal: r.int16le,
    limitReached: new r.Boolean(r.uint8)
});

const parser = serialPort.arduino_safety.pipe(new ByteLength({length:  Sensors.size()}))

serialPort.arduino_1.on('data', (data) => {
    arduinoResponse.send('sensors-status', data.toString())
})

parser.on('data', (data) => {
    //console.log(toHexString(data));
    let stream = new r.DecodeStream(data);
    let sensors = Sensors.decode(stream); 
    arduinoSafetyResponse.send('sensors-safety-status', sensors)
})

serialPort.arduino_safety.on('error', (error) => {
    console.log(`this error from safety: ${error}`)
})

serialPort.arduino_1.on('error', (error) => {
    console.log(`this error 1: ${error}`)
})

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
        path.join(__dirname, '/icon.png')
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
*       aciones por realizar en la base de datos
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////

ipc.handle('get-enabled-serial', (e, args) => {
    return ports;
});

ipc.handle('get-actuators-list', (e, args) => {
    const response = dataBase.getActuatorsList();
    return response;
});

ipc.handle('write-arduino', (e, args) => {
    serialPort.writeToArduino(args)
})

ipc.on('request-sensors-status', (e, args) => {
    serialPort.getSensorsStatus()
    arduinoResponse = e.sender
})

ipc.on('request-sensors-safety', (e, args) => {
    serialPort.getSensorsSafety();
    arduinoSafetyResponse = e.sender
})

ipc.handle('reconnect-arduino', (e, args) => {
    serialPort.connectArduino(args.arduino)
})


