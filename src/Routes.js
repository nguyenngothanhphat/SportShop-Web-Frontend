/* Import package */
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

/* Import Component */
import Header from "./components/nav/header";
import Home from "./components/home/home";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import ResgisterComplete from "./components/auth/registerComplete";
import ForgotPassword from "./components/auth/forgotPassword";
import History from './components/user/history';
import Password from './components/user/password';
import Wishlist from './components/user/wishlist';
import Dashboard from './components/admin/dashboard/dashboard'
import CreateCategory from './components/admin/category/createCategory'
import UpdateCategory from './components/admin/category/updateCategory'
import "./styles.css";

/* import private */
import UserPrivate from './components/private/userPrivate';
import AdminPrivate from './components/private/adminPrivate';

/* import firebase */
import { auth } from "./config/firebase";

/* import API */
import { currentUser } from "./util/api/auth-apis";

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: Routes.js ~ line 45 ~ unsubcribe ~ err",
              err
            );
          });
      }
    });
    return () => unsubcribe();
  }, [dispatch]);
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/register/complete" exact component={ResgisterComplete} />
        <Route path="/forgot/password" exact component={ForgotPassword} />
        <UserPrivate path="/user/history" exact component={History} />
        <UserPrivate path="/user/password" exact component={Password} />
        <UserPrivate path="/user/wishlist" exact component={Wishlist} />
        <AdminPrivate path="/admin/dashboard" exact component={Dashboard} />
        <AdminPrivate path="/admin/category" exact component={CreateCategory} />
        <AdminPrivate path="/admin/category/:slug" exact component={UpdateCategory} />
      </Switch>
    </>
  );
};

export default Routes;
