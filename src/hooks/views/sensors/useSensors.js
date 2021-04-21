import {useEffect, useState} from 'react';
import {
    useSCARAState,
    getSensorsStatus, 
    getSensorsSafety
} from '../../../context';
import useInterval from './useInterval';

const useSensors = () => {
    const components = useSCARAState();
    const sensors = components.sensors;
    const arduino1 = components.arduinos.find(i => i.id == 1);
    const arduinoSafety = components.arduinos.find(i => i.id == 3);
    const [sensores, setSensores] = useState(sensors);
    const [closedPort, setClosedPort] = useState({
        arduino1: undefined,
        arduinoSafety: undefined
    });


    useEffect(() => {
        setClosedPort(closedPort => ({...closedPort, ['arduino1']:arduino1.isOpen}))
        setClosedPort(closedPort => ({...closedPort, ['arduinoSafety']:arduinoSafety.isOpen}))
    }, [])

    const getSensors = async() => {
        window.api.removeListener('sensors-status')
        getSensorsStatus()
        await window.api.sensorsStatus((e, data) => {
            
            const received = data;
            const bandejas = received.split('')
            setSensores(sensores.map((item) => {
                bandejas.map((i, index) => {
                    if(item.name == `bandeja_${index+1}`){
                        item.value = parseInt(i)
                    }
                })
                return item 
            }))
            
        })
    }

    const getSafetyStatus = async() => {
        window.api.removeListener('sensors-safety-status')
        getSensorsSafety()
        await window.api.sensorsSafetyStatus((e, data) => {
            setSensores(sensores.map((item) => {
                switch(item.name){
                    case 'encoder':
                        item.value = data.encoderPos
                        break;
                    case 'ultrasonico':
                        item.value = data.limitReached
                        break;
                    case 'distancia_analogico':
                        item.value = data.adcVal
                        break;
                    case 'distancia_digital':
                        item.value = data.detected
                        break;
                }
                return item
            }))
        })
    }     

    useInterval(getSensors, arduino1.isOpen, 1000)
    useInterval(getSafetyStatus, arduinoSafety.isOpen, 100)

    return {
        closedPort,
        sensores
    }

}

export default useSensors;