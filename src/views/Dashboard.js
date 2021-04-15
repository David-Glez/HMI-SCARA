import React, {useState, useEffect} from 'react';
import ArduinoCard from '../components/cards/ArduinoCard';
import {useSCARAState} from '../context';

const Dashboard = (props) => {

    const [arduino, setArduino] = useState([]);
    const data = useSCARAState();
    const arduinos = data.arduinos;
    const ports = data.arduino_ports;
    
    useEffect(() => {
        arduinos.forEach((item) => {
            let data;
            const port = ports.find(i => i.arduino == item.id);
            if(port != undefined){
                data = {
                    id: item.id,
                    name: item.name,
                    path: port.port,
                    isOpen: port.open,
                    error: port.error
                }
            }else{
                data = {
                    id: item.id,
                    name: item.name,
                    path: 'N/A',
                    isOpen: false,
                    error: 'Desconectado'
                }
            }
            
            setArduino(arduino => ([...arduino, data]));
        })
    }, [data]);
    
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
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard;