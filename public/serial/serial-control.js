const {app} = require('electron');
const serialPort = require('serialport');
const dotenv = require('dotenv');
const path = require('path');

const dotenvLoaded = !app.isPackaged ? dotenv.config({path: path.join(app.getAppPath(), '/.env')}) : dotenv.config({path: path.join(app.getAppPath(), '/.env.production')});

if (dotenvLoaded.error) {
  throw dotenvLoaded.error
}

const portsAvailables = [];

//  Arduinos connection
const arduino_1 = new serialPort(process.env.PORT_ARDUINO_1, {
    baudRate: 115200,
    autoOpen: false
})

const arduino_2 = new serialPort(process.env.PORT_ARDUINO_2, {
    baudRate: 115200,
    autoOpen: false
})

const arduino_safety = new serialPort(process.env.PORT_ARDUINO_SAFETY, {
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
        case process.env.PORT_ARDUINO_1:
            isOpen = arduino_1.isOpen;
            if(isOpen == false){
                arduino_1.open();
            }
            isOpen = arduino_1.isOpen;
            break;
        case process.env.PORT_ARDUINO_2:
            isOpen = arduino_2.isOpen;
            if(isOpen == false){
                arduino_2.open()
            }
            isOpen = arduino_2.isOpen;
            break;
        case process.env.PORT_ARDUINO_SAFETY:
            isOpen = arduino_safety.isOpen;
            if(isOpen == false){
                arduino_safety.open()
            }
            isOpen = arduino_safety.isOpen;
            break;
    }
    return isOpen;
}

//  open port if is necessary
const checkPorts = (ports) => {
    ports.forEach((item) => {
        let isOpen;
        let arduino;
        switch(item.path){
            case process.env.PORT_ARDUINO_1:
                isOpen = connectArduino(item.path);
                arduino = {
                    arduino: 1,
                    port: item.path,
                    error: undefined,
                    open: isOpen
                }
                break;
            case process.env.PORT_ARDUINO_2:
                isOpen = connectArduino(item.path);
                arduino = {
                    arduino: 2,
                    port: item.path,
                    error: undefined,
                    open: isOpen
                }
                break;
            case process.env.PORT_ARDUINO_SAFETY:
                isOpen = connectArduino(item.path);
                arduino = {
                    arduino: 3,
                    port: item.path,
                    error: undefined,
                    open: isOpen
                }
                break;
        }
        if(arduino != undefined){
            portsAvailables.push(arduino)
        }
        
    })
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
    arduino_1,
    arduino_2,
    arduino_safety
}