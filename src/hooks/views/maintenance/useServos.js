import {useState, useEffect} from 'react';
import {useSCARAState, writeToSerial} from '../../../context';

const useServos = () => {

    const settings = useSCARAState();

    const [servo, setServo] = useState([])

    useEffect(() => {
        setServo(settings.servos)
    }, [])

    const onChangeRadio = (e) => {
        const element = e.target.name;
        const value = e.target.value;
        let code;

        const filter = servo.find(i => i.name === element)
        
        if(value === filter.value){
            console.log('nothing to do')
        }else{
            code = filter.tag+value
            setServo(servo.map(item => item.name === element ? {...item, value:value} : item))
            writeToSerial(filter.arduino, code)
        }
    }

    return{
        servo,
        onChangeRadio
    }
}

export default useServos;