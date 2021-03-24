import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { createOrUpdateUser } from '../../util/api/auth-apis';

import Header from '../nav/header'

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from)
    } else {
      if (res.data.role === 'admin') {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  }

  let dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log("🚀 ~ file: login.js ~ line 16 ~ handleSubmit ~ result", result)
      const { user } = result
      const idTokenResult = await user.getIdTokenResult();

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
          roleBasedRedirect(res);
        })
        .catch();

      history.push("/")
    } catch (error) {
      console.log("🚀 ~ file: login.js ~ line 31 ~ handleSubmit ~ error", error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <>
    <Header />
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading ...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}
          <Link to="/forgot/password" className="float-right text-danger">Forgot Password</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
