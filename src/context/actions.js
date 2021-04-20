const loadDataFromElectron = async(dispatch) => {
    let actuators, ports, peristaltics, diaphragms, components, servos, steppers, c_alterna, sensors;
    const arduinos = [];

    try{
        actuators = await window.api.getActuatorsList();
        ports = await window.api.getEnabledSerial();
    
        peristaltics = actuators.bombas.filter(i => i.type == 'peristaltic');
        diaphragms = actuators.bombas.filter(i => i.type == 'diaphragm');
        components = actuators.componentes;
        steppers = actuators.motores.filter(i => i.type == 'stepper');
        servos = actuators.motores.filter(i => i.type == 'servo');
        c_alterna = actuators.motores.filter(i => i.type == 'CA');
        sensors = actuators.sensores;

        actuators.arduinos.forEach((item) => {
            const port = ports.find(i => i.arduino == item.id)
            let data = {
                id: item.id,
                name: item.name,
                path: port.port,
                isOpen: port.open,
                error: port.error
            }
            arduinos.push(data)
        })

        dispatch({
            type: 'DATA_LOADED',
            arduinos: arduinos,
            peristaltics: peristaltics,
            diaphragms: diaphragms,
            components: components,
            steppers: steppers,
            servos: servos,
            c_alterna: c_alterna,
            sensors: sensors,
        })

    }catch(error){
        console.log(error)
    }
}

const verifyPorts = async(dispatch) => {
    try{
        const ports = await window.api.getEnabledSerial();
        console.log(ports)
        dispatch({
            type: 'PORT_RECONNECTED',
            ports: ports
        })
    }catch(error){
        console.log(error)
    }
}

const writeToSerial = (arduino, code) => {
    console.log(`this data is sending to ${arduino}: ${code}`)
    window.api.writeArduino({arduino, code})
}

const getSensorsStatus = () => {
    window.api.requestSensorsStatus()
}

const getSensorsSafety = () => {
    window.api.requestSensorsSafety()
}

const reconnect = (arduino) => {
    console.log(`reconnect arduino ${arduino}`)
    window.api.reconnectPort({arduino})
}

export {
    loadDataFromElectron,
    writeToSerial,
    getSensorsStatus,
    getSensorsSafety,
    reconnect,
    verifyPorts
}