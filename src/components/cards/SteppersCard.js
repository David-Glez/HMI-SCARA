import React from 'react';
import useSteppers from '../../hooks/views/maintenance/useSteppers';

const SteppersCard = (props) => {

    const {steppers, onChangeRange, sendToSerial} = useSteppers()

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-12'>
                        <h3 className = 'card-title'>
                            Motores a pasos
                        </h3>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                {steppers.map((item, index) => {
                    return(
                        <div className = 'row mt-4' key = {index}>
                            <div className = 'col-md-3'>
                                <label>{item.component}</label>
                            </div>
                            <div className = 'col-md-6'>
                                <div className = 'form-group'>
                                    <input
                                        type = 'range' 
                                        min = ''
                                        max = '2000' 
                                        defaultValue = {item.value}
                                        className = 'custom-range' 
                                        id = {item.name} 
                                        name = {item.name}
                                        onChange = {onChangeRange}
                                    />
                                    <span>Pasos: {item.steps}</span>
                                </div>
                            </div>
                            <div className = 'col-md-3'>
                                <button 
                                    className = 'btn btn-outline-secondary'
                                    onClick = {(e) => sendToSerial(e, item.name)}
                                >
                                    Activar
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

export default SteppersCard;
