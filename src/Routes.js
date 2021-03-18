import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';

import Header from './components/nav/header';
import Home from './components/home/home';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import ResgisterComplete from './components/auth/registerComplete'
import './styles.css'

import { auth } from './config/firebase';

const Routes = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                console.log("🚀 ~ file: Routes.js ~ line 22 ~ unsubcribe ~ user", user);
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        email: user.email,
                        token: idTokenResult.token,
                    }
                })
            }
        })
        return () => unsubcribe()
    }, [])
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