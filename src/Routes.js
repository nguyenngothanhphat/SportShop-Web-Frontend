import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import home from './components/home/index';
import Contact from './components/contact/index';
import SingleProduct from './components/singleproduct/index'
import Cart from './components/cart/index';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';
import UserDashboard from './components/auth/userDashboard';
import AdminDashboard from './components/auth/AdminDashboard';
import AddCategory from './components/admin/category/addCategory';
import AddSubCategory from './components/admin/category/addSubCategory'
import AddProduct from './components/admin/product/addProduct';
import Filter from './components/filter/filter';
import './styles.css'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/detail" exact component={SingleProduct} />
                <Route path="/carts" exact component={Cart} />
                <Route path="/shop" exact component={Filter} />
                <PrivateRoute path="/account" exact component={UserDashboard} />
                <AdminRoute path="/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/sub/category" exact component={AddSubCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;