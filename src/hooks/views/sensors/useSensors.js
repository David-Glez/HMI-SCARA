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
    const [closedPort, setClosedPort] = useState(undefined);

    useEffect(() => {
        if(arduinoSafety != undefined && arduino1 != undefined){
            console.log(arduinoSafety)
            console.log(arduino1)
            if(arduinoSafety.isOpen == false || arduino1.isOpen == false){
                setClosedPort(true)
            }else{
                setClosedPort(false)
            }
        }
    }, [components])

    const getSensors = async() => {
        window.api.removeListener('sensors-status')
        getSensorsStatus()
        //getSensorsSafety()
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

    useInterval(getSensors, 1000)
    useInterval(getSafetyStatus, 100)

    return {
        closedPort,
        sensores
    }

}

export default useSensors;