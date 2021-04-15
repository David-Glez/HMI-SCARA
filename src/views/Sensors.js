import React from 'react';
import SensorsTable from '../components/tables/SensorsTable';
import useSensors from '../hooks/views/sensors/useSensors';

const Sensors = (props) => {

    const {sensores} = useSensors()

    return(
        <>
        <div className = 'content'>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    <div className = 'col-md-12'>
                        <SensorsTable sensores = {sensores} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Sensors;