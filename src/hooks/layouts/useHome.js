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

    useEffect(() => {
        window.api.portReconnected((e, data) => {
            console.log(data)
        })
    })
}

export default useHome;