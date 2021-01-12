import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import login from "./components/auth/login";
import register from "./components/auth/register";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={login} />
                <Route path="/register" exact component={register} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;