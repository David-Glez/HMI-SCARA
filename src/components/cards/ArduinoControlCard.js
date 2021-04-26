import React from 'react';

const ArduinoControlCard = (props) => {

    const arduinos = props.arduinos;

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
                {arduinos.map((item, index) => {
                    return(
                        <div className = 'row mt-4' key = {index}>
                            <div className = 'col-md-4'>
                                <span>
                                    {item.name}
                                </span>
                            </div>
                            <div className = 'col-md-8'>
                                <button className = 'btn'>
                                    Reconectar
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default ArduinoControlCard;