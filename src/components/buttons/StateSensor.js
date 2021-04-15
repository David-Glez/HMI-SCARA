import React from 'react';

const StateSensor = (props) => {
    
    const sensor = props.sensor;

    return(
        <>
        {(sensor.tag == 'bandeja') && (
            <>
            <span 
                className = {
                    (sensor.value == 0) 
                    ? 'badge badge-pill badge-success'
                    : 'badge badge-pill badge-warning'
                }
            >
                {(sensor.value == 0) ? 'Disp.' : 'Ocupado'}
            </span>
            </>
        )}
        {(sensor.name == 'encoder') && (
            <>
            <span>{sensor.value}</span>
            </>
        )}
        {(sensor.type == 'proximity') && (
            <>
            {(sensor.name == 'ultrasonico' || sensor.name == 'distancia_digital') && (
                <span 
                    className = {
                        (sensor.value) 
                        ? 'badge badge-pill badge-success'
                        : 'badge badge-pill badge-warning'
                    }
                >
                    {(sensor.value) ? 'En rango' : 'Obstruido'}
                </span>
            )}
            {(sensor.name == 'distancia_analogico') && (
                <span>
                    {sensor.value}
                </span>
            )}
            </>
        )}
        </>
    )


}

export default StateSensor;