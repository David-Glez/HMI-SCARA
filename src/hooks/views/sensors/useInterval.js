import {useRef, useEffect} from 'react';

const useInterval = (arduino, closedPort, delay) => {
    const arduinoCallback = useRef();
    
    useEffect(() => {
        arduinoCallback.current = arduino;
    });

    useEffect(() => {
        let interval;
        const callArduino = () => {
            arduinoCallback.current();
        };

        if(closedPort != undefined){
            if(closedPort == true){
                interval = setInterval(callArduino, delay);
            }else{
                console.log(`nothing to do in ${delay}`)
            }
        }
        
        return () => {
            clearInterval(interval)
        }
    }, []);
}

export default useInterval;