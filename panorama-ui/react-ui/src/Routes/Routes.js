import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/login" exact component={Log In} />
                    <Route path="/signup" component={Sign Up} />
                </Switch>
            </Router>
        )
    }
}