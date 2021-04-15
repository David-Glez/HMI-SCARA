import {useState, useEffect} from 'react';
import {useSCARAState, getSensorsStatus} from '../../../context';
import useInterval from './useInterval';

const useSensors = () => {

    const components = useSCARAState();
    const sensors = components.sensors;
    const [sensores, setSensores] = useState(sensors);

    const getSensors = async() => {
        //  send code to get sensor's status from arduino 1
        getSensorsStatus()
        await window.api.sensorsStatus((e, data) => {
            console.log(data)
            window.api.removeListener('sensors-status')
        })

        await window.api.sensorsSafetyStatus((e, data) => {
            console.log(data)
            window.api.removeListener('sensors-safety-status')
        })
    
    }

    useEffect(() => {
        window.api.enableArduinoSafety()
    }, []);


    const disableArduinoSafety = () => {
        window.api.disableArduinoSafety()
    }

    useInterval(getSensors, disableArduinoSafety, 1000)

    return {
        sensores
    }

}

export default useSensors;