import {useRef, useEffect} from 'react';

const useInterval = (arduino1, closedPort, delay) => {
    const arduinoCallback = useRef();

    useEffect(() => {
        arduinoCallback.current = arduino1;
    });

    useEffect(() => {
        let interval;
        const callArduino = () => {
            arduinoCallback.current();
        };
        if(closedPort !== undefined && closedPort == false){
            interval = setInterval(callArduino, delay);
        }else{
            console.log('nothing to do')
        }
        
        return () => {
            clearInterval(interval)
        }
    }, []);
}

export default useInterval;