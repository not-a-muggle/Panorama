import React from 'react';
import './App.css';
import Home from './compnents/Home'
import SignIn from './compnents/SignIn'
import SignUp from './compnents/SignUp'
import Error from './compnents/Error'
import Navbar from './compnents/Navbar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

class App extends React.Component {
  render(){
  return (
    <Router>
      <Navbar />
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/SignIn" component={SignIn} />
                <Route path="/SignUp" component={SignUp} />
                <Route component={Error} />
            </Switch>
    </Router>
  );
}
}

export default App;
