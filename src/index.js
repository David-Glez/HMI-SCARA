import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/bootstrap.min.css'
import './assets/css/animate.min.css'
import './assets/css/styles.css'

//  Routes
import Routes from './routes';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faHome, 
    faTools,
    faBars,
    faPlug,
    faExpandAlt
} from "@fortawesome/free-solid-svg-icons"

import {
  faUsb
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faHome, faTools, faBars, faPlug, faUsb, faExpandAlt
  ) 

ReactDOM.render(
    <Routes />,
  document.getElementById('root')
);

