import React, {useRef} from 'react'
import {Route, Switch, useLocation, Redirect} from 'react-router-dom';

//  components
import Sidebar from '../components/sidebar/Sidebar';
import NavBar from '../components/navbar/Navbar';

const Home = (props) => {

    const mainPanel = useRef();
    const location = useLocation();

    return(
        <>
        <div className = 'wrapper'>
            <Sidebar location = {location} />
            <div className="main-panel" ref = {mainPanel} >
                <NavBar location = {location} />
                
            </div>
        </div>
        </>
    )

}

export default Home