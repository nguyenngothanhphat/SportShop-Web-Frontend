import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login, authenticate } from "../../util/api/auth-apis"

import Header from '../header/index';
import Footer from '../footer/index';

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToRefferer: false,
  });

  const { email, password, loading, error, redirectToRefferer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    login({ email, password }).then((data) => {
      console.log("🚀 ~ file: login.js ~ line 21 ~ clickSubmit ~ data", data);
      if (data.message) {
        setValues({ ...values, error: data.message, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToRefferer: true
          })
        })
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => {
    loading && (
      <div className="alert alert-info">
        <h2>Loading ...</h2>
      </div>
    )
  }

  const redirectUser = () => {
    if (redirectToRefferer) {
      return <Redirect to="/" />
    }
  }
  return (
    <div>
      <Header />
      {/* Banner */}
      <div className="banner-top">
        <div className="container">
          <h3>Login</h3>
          <h4>
            <Link to="/">Home</Link>
            <label>/</label>Login
          </h4>
          <div className="clearfix"> </div>
        </div>
      </div>
      {/* Login */}
      <div className="login">
        <div className="main-agileits">
          <div className="form-w3agile">
            <h3>Login</h3>
            {showError()}
            {showLoading()}
            {redirectUser()}
            <form action="#" method="post">
              <div className="key">
                <i className="fa fa-envelope" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Email"
                  name="Email"
                  onChange={handleChange("email")}
                  value={email}
                />
                <div className="clearfix" />
              </div>
              <div className="key">
                <i className="fa fa-lock" aria-hidden="true" />
                <input
                  type="password"
                  placeholder="Password"
                  name="Password"
                  onChange={handleChange("password")}
                  value={password}
                />
                <div className="clearfix" />
              </div>
              <input onClick={clickSubmit} type="submit" defaultValue="Login" />
            </form>
          </div>
          <div className="forg">
            <Link to="#" className="forg-left">
              Forgot Password
            </Link>
            <Link to="/register" className="forg-right">
              Register
            </Link>
            <div className="clearfix" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
