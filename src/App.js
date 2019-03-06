import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser} from "./actions/authActions";
import {Provider} from "react-redux";
import store from "./store";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import './css/normalize.css';
import './css/unsemantic-grid-responsive-tablet-no-ie7.css';
import './css/core.css';
import './App.css';

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    store.dispatch(setCurrentUser(token));
    if (window.location.pathname != "/dashboard") {
        window.location.pathname = "/dashboard";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}> <Router>
                <div id="App">
                    <Route exact path="/" render={props => <Redirect to="/login"/>}/>
                    <Route exact path="/login" component={Login}/> <Switch>
                    <PrivateRoute exact path="/dashboard" component={Dashboard}/> </Switch>
                </div>
            </Router> </Provider>
        );
    }
}

export default App;
