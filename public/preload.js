const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    removeListener: (channel, args) => ipcRenderer.removeAllListeners(channel),
    getEnabledSerial: (args) => ipcRenderer.invoke('get-enabled-serial'),
    getActuatorsList: (args) => ipcRenderer.invoke('get-actuators-list'),
    writeArduino: (args) => ipcRenderer.invoke('write-arduino', args),
    enableArduinoSafety: (args) => ipcRenderer.send('enable-arduino-safety'),
    disableArduinoSafety: (args) => ipcRenderer.invoke('disable-arduino-safety'),
    requestSensorsStatus: (args) => ipcRenderer.send('request-sensors-status', args),
    sensorsStatus: (callback, args) => ipcRenderer.on('sensors-status', (e, data) => {
        callback(e, data)
    }),
    sensorsSafetyStatus: (callback, args) => ipcRenderer.on('sensors-safet-status', (e, data) => {
        callback(e, data)
    })
});