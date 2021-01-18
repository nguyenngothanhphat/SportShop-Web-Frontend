import React, { useState } from "react";
import { API } from "../../config";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    error: "",
    success: false,
  });

  const { email, password, firstName, lastName, address, phoneNumber, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const login = (user) => {
    // console.log(user);
    return fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log("🚀 ~ file: register.js ~ line 33 ~ .then ~ res", res);
        return res.json();
      })
      .catch((err) => {
        console.log("🚀 ~ file: register.js ~ line 36 ~ login ~ err", err);
      });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    login({ email, password, firstName, lastName, address, phoneNumber }).then(
      (data) => {
      console.log("🚀 ~ file: register.js ~ line 45 ~ clickSubmit ~ data", data.message)
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: "",
            error: "",
            success: true,
          });
        }
      }
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
      New account is created. Please login.
    </div>
  )
  return (
    <div>
      <div className="banner-top">
        <div className="container">
          <h3>Register</h3>
          <h4>
            <a href="/">Home</a>
            <label>/</label>Register
          </h4>
          <div className="clearfix"> </div>
        </div>
      </div>
      {/* Login */}
      <div className="login">
        <div className="main-agileits">
          <div className="form-w3agile form1">
            <h3>Register</h3>
            {showSuccess()}
            {showError()}
            <form>
              <div className="key">
                <i className="fa fa-envelope" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Email"
                  name="Email"
                  //   onfocus="this.value = '';"
                  //   onblur="if (this.value == '') {this.value = 'Email';}"
                  onChange={handleChange("email")}
                  value={email}
                  required
                />
                <div className="clearfix" />
              </div>
              <div className="key">
                <i className="fa fa-lock" aria-hidden="true" />
                <input
                  type="password"
                  placeholder="Password"
                  name="Password"
                  //   onfocus="this.value = '';"
                  //   onblur="if (this.value == '') {this.value = 'Password';}"
                  onChange={handleChange("password")}
                  value={password}
                  required
                />
                <div className="clearfix" />
              </div>
              <div className="key">
                <i className="fa fa-envelope" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="First Name"
                  name="First Name"
                  //   onfocus="this.value = '';"
                  //   onblur="if (this.value == '') {this.value = 'firstName';}"
                  onChange={handleChange("firstName")}
                  value={firstName}
                  required
                />
                <div className="clearfix" />
              </div>
              <div className="key">
                <i className="fa fa-envelope" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="Last Name"
                  //   onfocus="this.value = '';"
                  //   onblur="if (this.value == '') {this.value = 'lastName';}"
                  onChange={handleChange("lastName")}
                  value={lastName}
                  required
                />
                <div className="clearfix" />
              </div>
              <div className="key">
                <i className="fa fa-envelope" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Address"
                  name="Address"
                  //   onfocus="this.value = '';"
                  //   onblur="if (this.value == '') {this.value = 'Address';}"
                  onChange={handleChange("address")}
                  value={address}
                  required
                />
                <div className="clearfix" />
              </div>
              <div className="key">
                <i className="fa fa-envelope" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Phone"
                  name="Number"
                  //   onfocus="this.value = '';"
                  //   onblur="if (this.value == '') {this.value = 'Number';}"
                  onChange={handleChange("phoneNumber")}
                  value={phoneNumber}
                  required
                />
                <div className="clearfix" />
              </div>
              <input onClick={clickSubmit} type="submit" placeholder="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
