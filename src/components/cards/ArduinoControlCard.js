import React from 'react';

const ArduinoControlCard = (props) => {

    const arduinos = props.arduinos;
    console.log(arduinos)

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-md-12'>
                        <h3 className = 'card-title'>
                            Control para Arduino
                        </h3>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                <div className = 'row'>
                    <ul className ="list-group">
                        {arduinos.map((item, index) => {
                            return(
                                <li key = {index}>
                                    
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default ArduinoControlCard;