import React, {useRef} from 'react'
import {Route, Switch, useLocation} from 'react-router-dom';

//  components
import Sidebar from '../components/sidebar/Sidebar';
import NavBar from '../components/navbar/Navbar';
import Dashboard from '../views/Dashboard';
import Maintenance from '../views/Maintenance';
import Sensors from '../views/Sensors';

const Home = (props) => {

    const mainPanel = useRef();
    const location = useLocation();

    return(
        <>
        <div className = 'wrapper'>
            <Sidebar location = {location} />
            <div className="main-panel" ref = {mainPanel} >
                <NavBar location = {location} />
                <Switch>
                    <Route exact path = '/' component = {Dashboard} />
                    <Route exact path = '/mantenimiento' component = {Maintenance} />
                    <Route exact path = '/sensores' component = {Sensors} />
                </Switch>
            </div>
        </div>
        </>
    )

}

export default Home