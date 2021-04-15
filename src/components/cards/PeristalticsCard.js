import React from 'react';
import usePeristaltics from '../../hooks/views/maintenance/usePeristaltics';

const PeristalticsCard = () => {

    const {
        peristalticas, 
        onChangeRange, 
        sendToSerial
    } = usePeristaltics()

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-12'>
                        <h3 className = 'card-title'>
                            Bombas Peristalticas
                        </h3>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                {peristalticas.map((item, index) => {
                    return(
                        <div className = 'row mt-4' key = {index}>
                            <div className = 'col-md-3'>
                                <label>{item.component}</label>
                            </div>
                            <div className = 'col-md-6'>
                                <div className = 'form-group'>
                                    <input
                                        type = 'range' 
                                        min = '10'
                                        max = '60000' 
                                        defaultValue = {item.value}
                                        className = 'custom-range' 
                                        id = {item.name} 
                                        name = {item.name}
                                        onChange = {onChangeRange}
                                    />
                                    <span>Tiempo: {item.seconds} segundos</span>
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

export default PeristalticsCard