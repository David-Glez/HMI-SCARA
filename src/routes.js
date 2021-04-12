import React from 'react';
import {
    Route,
    HashRouter,
    Switch
}from 'react-router-dom';

//  layout
import Home from './layouts/Home'

const Routes = () => {
    return(
        <HashRouter>
            <Switch>
                <Route exact path = '/' component = {Home} />
                <Route exact path = '/mantenimiento' component = {Home} />
            </Switch>
        </HashRouter>
    )
}

export default Routes;