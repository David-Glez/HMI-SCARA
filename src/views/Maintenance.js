import React from 'react';

//  components
import EjesCard from '../components/cards/EjesCard';
import ServosCard from '../components/cards/ServosCard';
import SteppersCard from '../components/cards/SteppersCard';
import DiaphragmsCard from '../components/cards/DiaphragmsCard';
import MotorsCACard from '../components/cards/MotorsCACard';
import PeristalticsCard from '../components/cards/PeristalticsCard';

import {useSCARAState} from '../context';

const Maintenance = (props) => {

    const components = useSCARAState();
    const arduinos = components.arduinos

    return(
        <>
        <div className = 'content'>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    <div className = 'col-md-8'>
                        <EjesCard />
                    </div>
                    <div className = 'col-md-4'>
                        <ServosCard />
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-md-6'>
                        <div className = 'row'>
                            <div className = 'col-md-12'>
                                <SteppersCard />
                            </div>
                        </div>
                        <div className = 'row'>
                            <div className = 'col-md-12'>
                                <MotorsCACard />
                            </div>
                        </div>
                    </div>
                    <div className = 'col-md-6'>
                        <div className = 'row'>
                            <div className = 'col-md-12'>
                                <DiaphragmsCard />
                            </div>
                        </div>
                        <div className = 'row'>
                            <div className = 'col-md-12'>
                                <PeristalticsCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Maintenance;