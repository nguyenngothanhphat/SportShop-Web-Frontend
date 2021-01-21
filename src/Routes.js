import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import home from './components/home/index';
import UserDashboard from './admin/components/dashboard/userDashboard'

const Routes = () => {
    return (
        <main>
            <div >
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={home} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                    </Switch>
                </BrowserRouter>
                <BrowserRouter>
                    <Switch>
                        <Route path="/admin" exact component={UserDashboard} />
                    </Switch>
                </BrowserRouter>
            </div>
        </main>
    )
}

export default Routes;