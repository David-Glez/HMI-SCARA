import {useEffect} from 'react';
import {loadDataFromElectron, useSCARADispatch, useSCARAState} from '../../context';
import usePorts from './usePorts';

const useHome = () => {

    const dispatch = useSCARADispatch();
    const components = useSCARAState();
    const arduinos = components.arduinos;

    useEffect(() => {
        loadDataFromElectron(dispatch)
    }, [])

    /*const checkPorts = () => {
        arduinos.forEach((item) => {
            if(!item.isOpen){
                console.log(item)
            }
        })
    }

    usePorts(checkPorts, 1000)*/

}

export default useHome;