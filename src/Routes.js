import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/nav/header';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from './components/home/home';
import './styles.css'

const Routes = () => {
    return (
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
            </Switch>
        </>
    )
}

export default Routes;