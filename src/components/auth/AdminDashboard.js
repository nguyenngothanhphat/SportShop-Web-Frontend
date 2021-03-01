import React from "react";
import { isAuthenticate } from '../../util/api/auth-apis';
import { Link } from 'react-router-dom';

import Header from '../header/index';
import Footer from '../footer/index';

const AdminDashboard = () => {
    const { user: { _id, firstName, lastName, email, role } } = isAuthenticate();

    const adminLinks = () => {
        return (
            <div className="panel panel-default">
                <h4 className="panel-heading">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">Create Product</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="panel panel-default mb-5">
                <h3 className="panel-heading">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{firstName + ' ' + lastName}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? 'Admin' : "Registered User"}</li>
                </ul>
            </div>
        )
    }
    return (
        <div>
            <Header />
            <div className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            {adminLinks()}
                        </div>
                        <div className="col-md-9">
                            {adminInfo()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminDashboard;