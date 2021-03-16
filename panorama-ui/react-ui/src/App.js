import React from 'react';
import './App.css';
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Error from './components/Error'
import Navbar from './components/Navbar'
import Images from './components/Images'
import LearnMore from './components/LearnMore'
import ForgotPassword from './components/ForgotPassword'
import UpdatePassword from './components/UpdatePassword'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ImageList from './components/ImageList'
import ImagePage from './components/ImagePage'
class App extends React.Component {
  render(){
  return (
    <Router>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/SignIn" component={SignIn} />
                <Route path="/SignUp" component={SignUp} />
                <Route path="/images" component={Images} />
                <Route path="/LearnMore" component={LearnMore} />
                <Route path="/ForgotPassword" component={ForgotPassword} />
                <Route path="/UpdatePassword" component={UpdatePassword} />
                <Route path="/ImageList" component={ImageList} />
                <Route path="/Image/:id" component={ImagePage} />
                <Route component={Error} />
            </Switch>
    </Router>
  );
}
}

export default App;
