import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import '../public/design/bootstrap/css/bootstrap.min.css';
import Navigation from './components/Navbar';
import Routes from './Routes';
import App from './App';
import { BrowserRouter} from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


