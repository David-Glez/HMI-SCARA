import React from 'react';

import ComponentsTable from '../components/tables/ComponentsTable';

const Components = (props) => {

    return(
        <>
        <div className = 'content'>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    <div className = 'col-md-12'>
                        <ComponentsTable />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Components;