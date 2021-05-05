const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    removeListener: (channel) => ipcRenderer.removeAllListeners(channel),
    getSerialEnabled: (args) => ipcRenderer.invoke('get-serial-enabled'),
    getActuatorsList: (args) => ipcRenderer.invoke('get-actuators-list'),
    writeArduino: (args) => ipcRenderer.invoke('write-arduino', args),
    requestSensorsStatus: (args) => ipcRenderer.send('request-sensors-status', args),
    sensorsStatus: (callback, args) => ipcRenderer.on('sensors-status', (e, data) => {
        callback(e, data)
    }),
    requestSensorsSafety: (args) => ipcRenderer.send('request-sensors-safety'),
    sensorsSafetyStatus: (callback, args) => ipcRenderer.on('sensors-safety-status', (e, data) => {
        callback(e, data)
    }),
    reconnectPort: (args) => ipcRenderer.send('reconnect-arduino', args),
    portReconnected: (callback, args) => ipcRenderer.on('port-reconnected', (e, data) => {
        callback(e, data)
    })
});