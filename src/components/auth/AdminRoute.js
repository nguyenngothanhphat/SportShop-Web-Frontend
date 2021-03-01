import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticate } from '../../util/api/auth-apis';

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticate() && isAuthenticate().user.role === 1 ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
)

export default AdminRoute;