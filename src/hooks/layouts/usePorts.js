import {useEffect, useRef} from 'react';

const usePorts = (callback, delay) => {

    const getData = useRef();

    useEffect(() => {
        getData.current = callback;
    })

    useEffect(() => {

        const refresh = () => {
            getData.current();
        }

        let interval = setTimeout(refresh, delay);

        return () => {
            clearTimeout(interval)
        }

    }, [])

}

export default usePorts;