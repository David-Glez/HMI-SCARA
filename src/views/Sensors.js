import React from 'react';
import SensorsTable from '../components/tables/SensorsTable';
import useSensors from '../hooks/views/sensors/useSensors';

const Sensors = (props) => {

    const {sensores, closedPort} = useSensors()

    return(
        <>
        <div className = 'content'>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    <div className = 'col-md-12'>
                        {(closedPort != undefined) && (
                            <>
                            {!closedPort.arduino1 && (
                                <div className = "alert alert-danger" role = "alert">
                                    Puerto desconectado! Verifique conexión de Arduino 1
                                </div>
                            )}
                            {!closedPort.arduinoSafety && (
                                <div className = "alert alert-danger" role = "alert">
                                    Puerto desconectado! Verifique conexión de Arduino Safety
                                </div>
                            )}
                            </>
                        )}
                        <SensorsTable
                            sensores = {sensores}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Sensors;