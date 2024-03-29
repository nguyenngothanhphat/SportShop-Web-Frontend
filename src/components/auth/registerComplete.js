import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux';

import { createOrUpdateUser } from '../../util/api/auth-apis';

import Header from '../nav/header'

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"))
  }, []);

  let dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* Validate */
    if (!email || !password) {
      toast.error('Email and Password is required');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(email, window.location.href);
      // console.log("result", result);
      if (result.user.emailVerified) {
        /* Remove user email for local storage */
        window.localStorage.removeItem("emailForRegistration");
        /* Get user id token */
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        /* Redux store */
        // console.log("user", user, "idTokenResult", idTokenResult);

        createOrUpdateUser(idTokenResult.token)
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
          .catch();

        /* Redirect */
        history.push("/");
      }
    } catch (error) {
      console.log("🚀 ~ file: registerComplete.js ~ line 22 ~ handleSubmit ~ error", error)
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />

      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />

      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );

  return (
    <>
    <Header />
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
    </>
  );
};

export default RegisterComplete;
