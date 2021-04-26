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

    const reconnect = () => {
        console.log('reconnecting ...')
    }

    useEffect(() => {
        let reconnectPort = setTimeout(() => {
            reconnect()
        }, 1000)

        return () => {
            clearTimeout(reconnectPort)
        }

    },  [])

    

    //usePorts(checkPorts, 1000)

}

export default useHome;