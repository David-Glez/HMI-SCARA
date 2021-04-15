import {useState, useEffect} from 'react';
import {writeToSerial, useSCARAState} from '../../../context';

const useAlternatingCurrent = () => {
    const settings = useSCARAState();
    const motors = settings.c_alterna;

    const [motorCA, setMotorCA] = useState([]);

    useEffect(() => {
        motors.forEach((item) => {
            let data = {
                id: item.id,
                arduino: item.arduino,
                component: item.component,
                name: item.name, 
                tag: item.tag,
                description: item.description,
                value: parseInt(item.value),
                seconds: parseFloat(item.value / 1000).toFixed(2)
            }
            setMotorCA(motorCA => ([...motorCA, data ]));
        })
    }, [])

    const onChangeRange = (e) => {
        const name = e.target.name;
        const value = parseFloat(e.target.value / 1000).toFixed(2);
        setMotorCA(motorCA.map(item => item.name === name ? {...item, seconds:value} : item));
    }

    const sendToSerial = (e, name) => {
        e.preventDefault();
        const element = motorCA.find(i => i.name == name);
        const code = element.tag + element.seconds;
        writeToSerial(element.arduino, code)
    }

    return {
        motorCA,
        onChangeRange,
        sendToSerial
    }

}

export default useAlternatingCurrent;