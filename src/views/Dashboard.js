import React from 'react';
import ArduinoCard from '../components/cards/ArduinoCard';
import ArduinoControlCard from '../components/cards/ArduinoControlCard';
import {useSCARAState} from '../context';

const Dashboard = (props) => {

    const data = useSCARAState();
    const arduino = data.arduinos
    
    return(
        <>
        <div className = 'content'>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    {arduino.map((item, index) => {
                        return(
                            <div className = 'col-md-4' key = {index}>
                                <ArduinoCard arduino = {item} />
                            </div>
                        )
                    })}
                </div>
                <div className = 'row'>
                    <div className = 'col-md-6'>
                        <ArduinoControlCard
                            arduinos = {arduino}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard;