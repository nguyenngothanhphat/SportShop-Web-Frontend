import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import login from "./components/auth/login";
import register from "./components/auth/register";
import home from './components/home/index';

const Routes = () => {
    return (
        <main>
            <div className="wrapper">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={home} />
                        <Route path="/login" exact component={login} />
                        <Route path="/register" exact component={register} />
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </div>
        </main>
    )
}

export default Routes;