const loadDataFromElectron = async(dispatch) => {
    let actuators, ports, arduinos, peristaltics, diaphragms, components, servos, steppers, c_alterna, sensors;
    try{
        actuators = await window.api.getActuatorsList();
        ports = await window.api.getEnabledSerial();
        console.log(ports)
        arduinos = actuators.arduinos;
        peristaltics = actuators.bombas.filter(i => i.type == 'peristaltic');
        diaphragms = actuators.bombas.filter(i => i.type == 'diaphragm');
        components = actuators.componentes;
        steppers = actuators.motores.filter(i => i.type == 'stepper');
        servos = actuators.motores.filter(i => i.type == 'servo');
        c_alterna = actuators.motores.filter(i => i.type == 'CA');
        sensors = actuators.sensores;

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
    console.log(`Requesting data from sensors`)
    window.api.requestSensorsStatus()
}

export {
    loadDataFromElectron,
    writeToSerial,
    getSensorsStatus
}