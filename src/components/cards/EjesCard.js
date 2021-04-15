import React from 'react';

import useEjes from '../../hooks/views/maintenance/useEjes';

const EjesCard = (props) => {

    const {ejes, onChangeRadio, sendToSerial} = useEjes();

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-md-12'>
                        <h3 className = 'card-title'>
                            Ejes
                        </h3>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                <div className = 'row'>
                    {ejes.map((item, index) => {
                        return(
                            <div className = 'col-md-4' key = {index}>
                                <label>
                                    {item.component}
                                </label>
                                <div className = 'form-check'>
                                    <input 
                                        type = 'radio' 
                                        value = '50' 
                                        className = 'form-check-input' 
                                        id = {item.name} 
                                        name = {item.name}
                                        onChange = {onChangeRadio} 
                                        defaultChecked />
                                    <label>
                                        50 pasos
                                    </label>
                                </div>
                                <div className = 'form-check'>
                                    <input 
                                        type = 'radio' 
                                        value = '400' 
                                        className = 'form-check-input' 
                                        id = {item.name} 
                                        name = {item.name} 
                                        onChange = {onChangeRadio} />
                                    <label>
                                        400 pasos
                                    </label>
                                </div>
                                <div className = 'form-check'>
                                    <input 
                                    type = 'radio' 
                                    value = '1000' 
                                    className = 'form-check-input' 
                                    id = {item.name} 
                                    name = {item.name} 
                                    onChange = {onChangeRadio} />
                                    <label>
                                        1000 pasos
                                    </label>
                                </div>
                                <div className = 'input-group'>
                                    <label>Pos. software: {item.steps}</label>
                                </div>
                                <div className = 'input-group'>
                                    <button 
                                        className = 'btn btn-secondary mr-4' 
                                        onClick = {(e) => sendToSerial(e, 'remove', item.name)}
                                        >
                                        -
                                    </button>
                                    <button 
                                        className = 'btn btn-secondary'
                                        onClick = {(e) => sendToSerial(e, 'add', item.name)}
                                        >
                                        +
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )

}

export default EjesCard;