import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login, authenticate, isAuthenticate } from "../../util/api/auth-apis"

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToRefferer: false,
  });

  const { email, password, loading, error, redirectToRefferer } = values;
  const { user } = isAuthenticate();

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
      if (user && user.role === 1) {
        return <Redirect to="/dashboard" />
      } else {
        return <Redirect to="/account" />
      }
    }
    // if (isAuthenticate()) {
    //   return <Redirect to="/" />;
    // }
  }
  return (
    <div className="background">
      <div className="center">
        <h1>Login</h1>
        {showError()}
        {showLoading()}
        {redirectUser()}
        <form method="POST">
          <div className="txt_field">
            <input type="text" name="Email" onChange={handleChange("email")} value={email} />
            <span></span>
            <label>Email: </label>
          </div>
          <div className="txt_field">
            <input type="password" name="Password" onChange={handleChange("password")} value={password} />
            <span></span>
            <label>Password: </label>
          </div>
          <div className="pass">Forgot Password ?</div>
          <input onClick={clickSubmit} type="submit" value="Login" />
          <div className="signup_link">
            Not a member ? <Link to="/register">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

{/* <div className="main-agileits">
          <div className="form-w3agile">
            <h3>Login</h3>
            {showError()}
            {showLoading()}

            <form>
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
        </div> */}
