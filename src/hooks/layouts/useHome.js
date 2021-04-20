import {useEffect} from 'react';
import {loadDataFromElectron, useSCARADispatch, useSCARAState} from '../../context';

const useHome = () => {

    const dispatch = useSCARADispatch();
    const components = useSCARAState();
    console.log(components.arduinos)

    useEffect(() => {
        loadDataFromElectron(dispatch)
    }, [])

}

export default useHome;