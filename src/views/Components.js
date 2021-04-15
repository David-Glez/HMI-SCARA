import React from 'react';

import ComponentsCard from '../components/cards/ComponentsCard';

const Components = (props) => {

    return(
        <>
        <div className = 'content'>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    <div className = 'col-md-12'>
                        <ComponentsCard />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Components;