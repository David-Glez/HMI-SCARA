import {useState, useEffect} from 'react';
import {useSCARAState, writeToSerial} from '../../../context';

const useEjes = () => {

    const components = useSCARAState();
    const axes = components.steppers.filter(i => i.arduino == 1);

    const [ejes, setEjes] = useState([])
    const [steps, setSteps] = useState([])
    
    useEffect(() => {
        axes.forEach((item) => {
            let data = {
                id: item.id,
                name: item.name,
                arduino: item.arduino,
                tag: item.tag,
                steps: 0,
                values: JSON.parse(item.value)
            }
            setEjes(ejes => ([...ejes, data ]))
            let order = {
                eje: item.name,
                tag: item.tag,
                steps: 50
            }
            setSteps(steps => ([...steps, order]))
        })
        
    }, [])

    const onChangeRadio = (e) => {
        const eje = e.target.name;
        const pasos = e.target.value;
        const orders = steps.find(i => i.eje === eje);
        orders.steps = parseInt(pasos)
    }

    const sendToSerial = (e, action, eje) => {
        e.preventDefault()
        const data = steps.find(i => i.eje === eje)
        const stepper = ejes.find(i => i.name == eje)
        let code;
        let sumaAux = 0;

        switch(data.steps){
            case 50:
                sumaAux = stepper.steps;
                if(action === 'remove'){
                    code = stepper.tag+stepper.values.low.quit;
                    sumaAux -= data.steps
                }
                if(action === 'add'){
                    code = stepper.tag+stepper.values.low.add;
                    sumaAux += data.steps
                }
                if(sumaAux < 0){
                    console.log('no se mueve')
                }else{
                    setEjes(ejes.map(item => item.name === stepper.name ? {...item, steps:sumaAux} : item))
                    writeToSerial(stepper.arduino, code)
                }
                break;
            case 400:
                sumaAux = stepper.steps;
                if(action === 'remove'){
                    code = stepper.tag+stepper.values.middle.quit
                    sumaAux -= data.steps
                }
                if(action === 'add'){
                    code = stepper.tag+stepper.values.middle.add
                    sumaAux += data.steps
                }
                if(sumaAux < 0){
                    console.log('no se mueve')
                }else{
                    setEjes(ejes.map(item => item.name === stepper.name ? {...item, steps:sumaAux} : item))
                    writeToSerial(stepper.arduino, code)
                }
                break;
            case 1000: 
                sumaAux = stepper.steps;
                if(action === 'remove'){
                    code = stepper.tag+stepper.values.high.quit
                    sumaAux -= data.steps
                }
                if(action === 'add'){
                    code = stepper.tag+stepper.values.high.add
                    sumaAux += data.steps
                }
                if(sumaAux < 0){
                    console.log('no se mueve')
                }else{
                    setEjes(ejes.map(item => item.name === stepper.name ? {...item, steps:sumaAux} : item))
                    writeToSerial(stepper.arduino, code)
                }
                break;
        }
    }

    return{
        ejes,
        onChangeRadio,
        sendToSerial
    }

}

export default useEjes