const SerialPort = require('serialport');
const ByteLength = require('@serialport/parser-byte-length')
const r = require('restructure');


const Sensors = new r.Struct({
    encoderPos: r.int32le,
    detected: new r.Boolean(r.uint8),
    adcVal: r.int16le,
    limitReached: new r.Boolean(r.uint8)
});

function toHexString(byteArray) {
    var s = '';

    byteArray.forEach(function(byte) {
        s += ('0' + (byte & 0xFF).toString(16)).slice(-2).toUpperCase();
        s += "\t";
    });

    return s;
}

class ArduinoSensors {
    sensors;
    isUpdating = false;

    constructor(arduinoPort) {
        this.arduinoPort = arduinoPort;

        this.serialPort = new SerialPort(this.arduinoPort, { baudRate : 115200, autoOpen: false  });

        this.parser = this.serialPort.pipe(new ByteLength({length:  Sensors.size()}));

        this.parser.on('data', (data) => { // a ByteParser with length guarantees set amount of bytes
            console.log(toHexString(data));

            let stream = new r.DecodeStream(data);
            this.sensors = Sensors.decode(stream); 

            if(this.onUpdateFn)
                this.onUpdateFn(this.sensors);
        });

        this.updateInterval = 500;
    }

    connect = function()
    {
        this.serialPort.open(function (err) {
            if (err) {
              return console.log('Error opening port: ', err.message)
            }
        });
    }

    disconnect = function()
    {
        this.serialPort.close();
    }

    updateData = function()
    {
        if(!this.serialPort.isOpen)
        {
            console.error("Serialport " + this.arduinoPort + " is not open. Call start() first.");
            return;
        }

        this.serialPort.write("g\0", function(err){
            if(err)
                console.error(err);
        });
    }

    startAutoUpdating = function()
    {
        this.isUpdating = true;

        this.updateTask = setInterval(() => {
            this.updateData()
        }, this.updateInterval);
    }

    stopAutoUpdating = function()
    {
        this.isUpdating = false;

        clearInterval(this.updateTask);
    }

    onUpdate = function(fn)
    {
        this.onUpdateFn = fn;
    }

    setUpdateInterval = function(interval)
    {
        this.updateInterval = interval;

        if(this.updateTask == null)
            return;

        clearInterval(this.updateTask);

        this.updateTask = setInterval(() => {
            this.updateData()
        }, interval);
    }
}

module.exports = ArduinoSensors