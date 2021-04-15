import React from 'react';
import {
    Route,
    HashRouter,
    Switch
}from 'react-router-dom';

//  context
import {SCARAProvider} from './context';

//  layout
import Home from './layouts/Home'

const Routes = () => {
    return(
        <SCARAProvider>
        <HashRouter>
            <Switch>
                <Route exact path = '/' component = {Home} />
                <Route exact path = '/mantenimiento' component = {Home} />
                <Route exact path = '/sensores' component = {Home} />
                <Route exact path = '/componentes' component = {Home} />
            </Switch>
        </HashRouter>
        </SCARAProvider>
    )
}

export default Routes;