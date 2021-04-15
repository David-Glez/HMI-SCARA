import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/css/styles.css';

//  Layout
import Routes from './routes';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faHome, 
    faTools,
    faBars,
    faPlug,
    faExpandAlt,
    faMicrochip
} from "@fortawesome/free-solid-svg-icons"
import {
  faUsb
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faHome, faTools, faBars, faPlug, faUsb, faExpandAlt, faMicrochip
  ) 

ReactDOM.render(
    <Routes />
    ,
  document.getElementById('root')
);

