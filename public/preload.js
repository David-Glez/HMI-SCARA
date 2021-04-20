const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    removeListener: (channel) => ipcRenderer.removeAllListeners(channel),
    getEnabledSerial: (args) => ipcRenderer.invoke('get-enabled-serial'),
    getActuatorsList: (args) => ipcRenderer.invoke('get-actuators-list'),
    writeArduino: (args) => ipcRenderer.invoke('write-arduino', args),
    requestSensorsStatus: (args) => ipcRenderer.send('request-sensors-status', args),
    sensorsStatus: (callback, args) => ipcRenderer.on('sensors-status', (e, data) => {
        callback(e, data)
    }),
    requestSensorsSafety: (args) => ipcRenderer.send('request-sensors-safety'),
    sensorsSafetyStatus: (callback, args) => ipcRenderer.on('sensors-safety-status', (e, data) => {
        callback(e, data)
    })
});