import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import home from './components/home/index';

const Routes = () => {
    return (
        <main>
            <div className="wrapper">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={home} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </div>
        </main>
    )
}

export default Routes;