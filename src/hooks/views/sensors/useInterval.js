import {useRef, useEffect} from 'react';

const useInterval = (arduino1Callback, arduinoSafetyCallback, delay) => {
    const arduino1 = useRef();
    const safety = useRef();

    useEffect(() => {
        arduino1.current = arduino1Callback;
        safety.current = arduinoSafetyCallback;
    });

    useEffect(() => {
        const refresh = () => {
            arduino1.current();
        };
        let intervalo = setInterval(refresh, delay);

        return () => {
            safety.current();
            clearInterval(intervalo)
        }
    }, []);
}

export default useInterval;