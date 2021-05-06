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

        let interval = setInterval(refresh, delay);

        return () => {
            clearInterval(interval)
        }

    }, [])

}

export default usePorts;