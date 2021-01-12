import React from 'react';
import { Link } from 'react-router-dom';

const login = () => {
    return (
        <div>
            {/* Banner */}
            <div className="banner-top">
                <div className="container">
                    <h3>Login</h3>
                    <h4><Link to="/">Home</Link><label>/</label>Login</h4>
                    <div className="clearfix"> </div>
                </div>
            </div>
            {/* Login */}
            <div className="login">
                <div className="main-agileits">
                    <div className="form-w3agile">
                        <h3>Login</h3>
                        <form action="#" method="post">
                            <div className="key">
                                <i className="fa fa-envelope" aria-hidden="true" />
                                <input type="text" defaultValue="Email" name="Email" />
                                <div className="clearfix" />
                            </div>
                            <div className="key">
                                <i className="fa fa-lock" aria-hidden="true" />
                                <input type="password" defaultValue="Password" name="Password" />
                                <div className="clearfix" />
                            </div>
                            <input type="submit" defaultValue="Login" />
                        </form>
                    </div>
                    <div className="forg">
                        <Link to="#" className="forg-left">Forgot Password</Link>
                        <Link to="/register" className="forg-right">Register</Link>
                        <div className="clearfix" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login;