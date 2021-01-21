import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import home from './components/home/index';
import Contact from './components/contact/index';
import SingleProduct from './components/singleproduct/index'
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
                        <Route path="/contact" exact component={Contact} />
                        <Route path="/detail" exact component={SingleProduct} />
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