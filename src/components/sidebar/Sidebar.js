import React from 'react';
import logo from '../../assets/img/roboshot-logo.png';
import {Link, useLocation} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Sidebar = (props) => {
    const path = props.location.pathname
    return(
        <>
        <div className = 'sidebar' data-color = 'black'>
            <div className = 'sidebar-background'>

            </div>
            <div className = 'sidebar-wrapper'>
                <div className="logo d-flex align-items-center justify-content-center">
                    
                    <Link to = '/' className="simple-text text-center">
                        <img src={logo} id='logoAdmin' className = 'logoAdmin'/>
                    </Link>
                </div>
                <Nav>
                    <li className = {path == '/' ? 'active' : ''}>
                        <Link to = '/' className="nav-link" >
                            <FontAwesomeIcon icon = 'home' className = 'mr-3' />
                            <p>Inicio</p>
                        </Link>
                    </li>
                    <li className = {path == '/mantenimiento' ? 'active' : ''}>
                        <Link to = '/mantenimiento' className="nav-link" >
                            <FontAwesomeIcon icon = 'tools' className = 'mr-3' />
                            <p>Mantenimiento</p>
                        </Link>
                    </li>
                    <li className = {path == '/sensores' ? 'active' : ''}>
                        <Link to = '/sensores' className="nav-link" >
                            <FontAwesomeIcon icon = 'expand-alt' className = 'mr-3' />
                            <p>Sensores</p>
                        </Link>
                    </li>
                    <li className = {path == '/componentes' ? 'active' : ''}>
                        <Link to = '/componentes' className="nav-link" >
                            <FontAwesomeIcon icon = 'microchip' className = 'mr-3' />
                            <p>Componentes</p>
                        </Link>
                    </li>
                </Nav>
            </div>
        </div>
        </>
    )
}

export default Sidebar