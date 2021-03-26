/* Import package */
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

/* Import Component */
import Header from "./components/nav/header";
// import Footer from "./components/nav/footer";
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
import UpdateCategory from './components/admin/category/updateCategory';
import CreateBrand from './components/admin/brand/createBrand';
import UpdateBrand from './components/admin/brand/updateBrand';
import CreateSubCategory from './components/admin/subCategory/createSubCategory';
import UpdateSubCategory from './components/admin/subCategory/updateSubCategory';
import CreateProduct from './components/admin/product/createProduct';
import AllProducts from './components/admin/product/products';
import UpdateProduct from './components/admin/product/updateProduct';
import DetailProduct from './components/product/detail';
import CategoryHome from './components/category/detailCategory';
import SubCategoryHome from './components/category/detailSubCategory';
import Filter from './components/filter/filter';
import Cart from './components/shoppingCart/cart'
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
      {/* <Header /> */}
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
        <AdminPrivate path="/admin/sub/category" exact component={CreateSubCategory} />
        <AdminPrivate path="/admin/sub/:slug" exact component={UpdateSubCategory} />
        <AdminPrivate path="/admin/brand/category" exact component={CreateBrand} />
        <AdminPrivate path="/admin/brand/:slug" exact component={UpdateBrand} />
        <AdminPrivate path="/admin/product" exact component={CreateProduct} />
        <AdminPrivate path="/admin/product/:slug" exact component={UpdateProduct} />
        <AdminPrivate path="/admin/products" exact component={AllProducts} />
        <Route path="/product/:slug" component={DetailProduct} />
        <Route path="/category/:slug" component={CategoryHome} />
        <Route path="/sub/:slug" component={SubCategoryHome} />
        <Route path="/filter/product" component={Filter} />
        <Route path="/cart" component={Cart} />
      </Switch>
      {/* <Footer /> */}
    </>
  );
};

export default Routes;
