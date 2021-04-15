import React from 'react';
import StateSensor from '../buttons/StateSensor';

const SensorsTable = (props) => {

    const sensores = props.sensores;

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-12'>
                        <h3 className = 'card-title'>
                            Sensores
                        </h3>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                <div className ="table-responsive-md ">
                <table className = 'table table-hover'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Nombre</th>
                            <th>Arduino</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sensores.map((item, index) => {
                            return(
                                <tr key = {index}>
                                    <td>{item.id}</td>
                                    <td>{item.type}</td>
                                    <td>{item.component}</td>
                                    <td>{item.arduino_name}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <StateSensor sensor = {item} />
                                    </td>
                                    <td></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Nombre</th>
                            <th>Arduino</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Valor</th>
                        </tr>
                    </tfoot>
                </table>
                </div>
            </div>
        </div>
        </>
    )

}

export default SensorsTable;