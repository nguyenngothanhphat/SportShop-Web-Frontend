import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from './components/nav/header';
import Home from './components/home/home';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import ResgisterComplete from './components/auth/registerComplete'
import './styles.css'

const Routes = () => {
    return (
        <>
            <Header />
            <ToastContainer />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/register/complete" exact component={ResgisterComplete} />
            </Switch>
        </>
    )
}

export default Routes;