import {useRef, useEffect} from 'react';

const useInterval = (arduino1, delay) => {
    const arduinoCallback = useRef();

    useEffect(() => {
        arduinoCallback.current = arduino1;
    });

    useEffect(() => {
        const callArduino = () => {
            arduinoCallback.current();
        };
        
        let interval = setInterval(callArduino, delay);
        
        return () => {
            clearInterval(interval)
        }
    }, []);
}

export default useInterval;