const {app} = require('electron');
const serialPort = require('serialport');
const dotenv = require('dotenv');
const path = require('path');

const dotenvLoaded = !app.isPackaged ? dotenv.config({path: path.join(app.getAppPath(), '/.env')}) : dotenv.config({path: path.join(app.getAppPath(), '/.env.production')});

if (dotenvLoaded.error) {
  throw dotenvLoaded.error
}

const portsAvailables = [];

let arduino1 = process.env.PORT_ARDUINO_1;
let arduino2 = process.env.PORT_ARDUINO_2;
let arduinoSafety = process.env.PORT_ARDUINO_SAFETY;

//  Arduinos connection
const arduino_1 = new serialPort(arduino1, {
    baudRate: 115200,
    autoOpen: false
})

const arduino_2 = new serialPort(arduino2, {
    baudRate: 115200,
    autoOpen: false
})

const arduino_safety = new serialPort(arduinoSafety, {
    baudRate: 115200,
    autoOpen: false
})

const writeToArduino = (params) => {
    console.log('write to arduino')
    switch(params.arduino){
        case 1:
            arduino_1.write(params.code)
            arduino_1.flush();
            break;
        case 2:
            arduino_2.write(params.code)
            arduino_2.flush();
            break;
    }
}

const getSensorsStatus = () => {
    //  write to arduino 1 to get bandejas sensors's status
    arduino_1.write('S');
    arduino_1.flush();
}

const getSensorsSafety = () => {
    arduino_safety.write("g\0");
    arduino_safety.flush();
}

const connectArduino = (arduino) => {

    let isOpen;
    switch(arduino){
        case arduino1:
            isOpen = arduino_1.isOpen;
            if(isOpen == false){
                arduino_1.open();
            }
            break;
        case arduino2:
            isOpen = arduino_2.isOpen;
            if(isOpen == false){
                arduino_2.open()
            }
            break;
        case arduinoSafety:
            isOpen = arduino_safety.isOpen;
            if(isOpen == false){
                arduino_safety.open()
            }
            break;
    }
}

//  open port if necessary
const checkPorts = (ports) => {

    let arduino;
    const findArduino1 = ports.find(i => i.path == arduino1);
    const findArduino2 = ports.find(i => i.path == arduino2);
    const findArduinoSafety = ports.find(i => i.path == arduinoSafety);

    if(findArduino1 != undefined){
        connectArduino(arduino1);
        arduino = {
            arduino: 1,
            port: arduino1,
            error: undefined,
            open: undefined
        }
        portsAvailables.push(arduino)
    }else{
        arduino = {
            arduino: 1,
            port: arduino1,
            error: undefined,
            open: false
        }
        portsAvailables.push(arduino)
    }
    if(findArduino2 != undefined){
        connectArduino(arduino2);
        arduino = {
            arduino: 2,
            port: arduino2,
            error: undefined,
            open: undefined
        }
        portsAvailables.push(arduino)
    }else{
        arduino = {
            arduino: 2,
            port: arduino2,
            error: undefined,
            open: false
        }
        portsAvailables.push(arduino)
    }
    if(findArduinoSafety != undefined){
        connectArduino(arduinoSafety);
        arduino = {
            arduino: 3,
            port: arduinoSafety,
            error: undefined,
            open: undefined
        }
        portsAvailables.push(arduino)
    }else{
        arduino = {
            arduino: 3,
            port: arduinoSafety,
            error: undefined,
            open: false
        }
        portsAvailables.push(arduino)
    }    
}

const startConnection = () => {
    return new Promise((resolve, reject) => {
        serialPort
        .list()
        .then((ports) => {
            checkPorts(ports)
            resolve(portsAvailables)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

module.exports = {
    startConnection,
    writeToArduino,
    getSensorsStatus,
    getSensorsSafety,
    connectArduino,
    arduino_1,
    arduino_2,
    arduino_safety
}