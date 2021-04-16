import {useState} from 'react';
import {useSCARAState, getSensorsStatus, getSensorsSafety} from '../../../context';
import useInterval from './useInterval';

const useSensors = () => {

    const components = useSCARAState();
    const sensors = components.sensors;
    const [sensores, setSensores] = useState(sensors);
 
    const getSensors = async() => {
        window.api.removeListener()
        getSensorsStatus()
        getSensorsSafety()
        await window.api.sensorsStatus((e, data) => {
            
            //  data from bandejas
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

    useInterval(getSensors, 50)

    return {
        sensores
    }

}

export default useSensors;