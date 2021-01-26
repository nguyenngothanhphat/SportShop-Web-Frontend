import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import home from './components/home/index';
import Contact from './components/contact/index';
import SingleProduct from './components/singleproduct/index'
import Cart from './components/cart/index';

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
                        <Route path="/carts" exact component={Cart} />
                    </Switch>
                </BrowserRouter>
            </div>
        </main>
    )
}

export default Routes;