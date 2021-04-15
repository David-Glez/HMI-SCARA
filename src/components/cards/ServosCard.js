import React from 'react';
import useServos from '../../hooks/views/maintenance/useServos';

const ServosCard = () => {

    const {servo, onChangeRadio} = useServos();

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-12'>
                        <h3 className = 'card-title'>
                            Servomotores
                        </h3>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                {servo.map((item, index) => {
                    return(
                        <div className = 'row mt-3' key = {index}>
                            <div className = 'col-md-6'>
                                <label>{item.component}</label>
                            </div>
                            <div className = 'col-md-6'>
                                <div className = 'form-check form-check-inline'>
                                    <input 
                                        type = 'radio'
                                        value = '0'
                                        className = 'form-check-input'
                                        id = {item.name} 
                                        name = {item.name} 
                                        onChange = {onChangeRadio}
                                        checked = {item.value === '0'}
                                        />
                                    <label className = 'form-check-label'>OFF</label>
                                </div>
                                <div className = 'form-check form-check-inline'>
                                    <input 
                                        type = 'radio'
                                        value = '1'
                                        className = 'form-check-input'
                                        id = {item.name} 
                                        name = {item.name}
                                        onChange = {onChangeRadio}
                                        checked = {item.value === '1'} 
                                        />
                                    <label className = 'form-check-label'>ON</label>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default ServosCard;