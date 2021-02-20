import React from 'react';
import './App.css';
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Error from './components/Error'
import Navbar from './components/Navbar'
import Album from './components/Album'
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
                <Route path="/Album" component={Album} />
                <Route component={Error} />
            </Switch>
    </Router>
  );
}
}

export default App;
