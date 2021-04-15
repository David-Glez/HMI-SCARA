import React from 'react';
import {useSCARAState} from '../../context';

const ComponentsCard = (props) => {

    const settings = useSCARAState();
    const components = settings.components;

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-md-12'>
                        <h3 className = 'card-title'>
                            Componentes
                        </h3>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                <div className = 'row'>
                    <div className = 'col-md-12'>
                        <div className = 'table-responsive-md'>
                            <table className = 'table table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {components.map((item, index) => {
                                        return(
                                            <tr key = {index}>
                                                <td>{item.id}</td>
                                                <td>{item.component}</td>
                                                <td>{item.description}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ComponentsCard;