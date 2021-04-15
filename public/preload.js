const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getEnabledSerial: (args) => ipcRenderer.invoke('get-enabled-serial'),
    getActuatorsList: (args) => ipcRenderer.invoke('get-actuators-list'),
    writeArduino: (args) => ipcRenderer.send('write-arduino', args)
})