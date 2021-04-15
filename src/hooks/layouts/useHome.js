import {useEffect} from 'react';
import {loadDataFromElectron, useSCARADispatch} from '../../context';

const useHome = () => {

    const dispatch = useSCARADispatch()

    useEffect(() => {
        loadDataFromElectron(dispatch)
    }, [])

}

export default useHome;