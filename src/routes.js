import React from 'react';
import {
    Route,
    BrowserRouter,
    Switch
}from 'react-router-dom';

//  layout
import Home from './layouts/Home'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = '/' component = {Home} />
                <Route exact path = '/mantenimiento' component = {Home} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;