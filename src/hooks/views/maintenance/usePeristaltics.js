import {useState, useEffect} from 'react';
import {writeToSerial, useSCARAState} from '../../../context';

const usePeristaltics = () => {

    const settings = useSCARAState();
    const pumps = settings.peristaltics;

    const [peristalticas, setPeristalticas] = useState([]);

    useEffect(() => {
        pumps.forEach((item) => {
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
            setPeristalticas(peristalticas => ([...peristalticas, data ]));
        })
    }, [])

    const onChangeRange = (e) => {
        const name = e.target.name;
        const value = parseFloat(e.target.value / 1000).toFixed(2);
        setPeristalticas(peristalticas.map(item => item.name === name ? {...item, seconds:value} : item));
    }

    const sendToSerial = (e, name) => {
        e.preventDefault();
        const element = peristalticas.find(i => i.name == name);
        const code = element.tag + element.seconds;
        writeToSerial(element.arduino, code)
    }

    return{
        peristalticas,
        onChangeRange,
        sendToSerial
    }

}

export default usePeristaltics