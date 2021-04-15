import {useState, useEffect} from 'react';
import {writeToSerial, useSCARAState} from '../../../context';

const useSteppers = () => {
    const settings = useSCARAState();
    const stepper = settings.steppers.filter(i => i.arduino == 2)

    const [steppers, setSteppers] = useState([]);

    useEffect(() => {
        stepper.forEach((item) => {
            let data = {
                id: item.id,
                arduino: item.arduino,
                component: item.component,
                name: item.name, 
                tag: item.tag,
                description: item.description,
                value: parseInt(item.value),
                steps: parseInt(item.value)
            }
            setSteppers(steppers => ([...steppers, data ]));
        })
    }, [])

    const onChangeRange = (e) => {
        const name = e.target.name;
        const value = parseInt(e.target.value);
        setSteppers(steppers.map(item => item.name === name ? {...item, steps:value} : item));
    }

    const sendToSerial = (e, name) => {
        e.preventDefault();
        const element = steppers.find(i => i.name == name);
        const code = element.tag + element.steps;
        writeToSerial(element.arduino, code);
    }

    return {
        steppers,
        onChangeRange,
        sendToSerial
    }
}

export default useSteppers;