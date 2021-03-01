import React from "react";
import { isAuthenticate } from '../../util/api/auth-apis';
import { Link } from 'react-router-dom';

import Header from '../header/index';
import Footer from '../footer/index';

const Dashboard = () => {
    const { user: { _id, firstName, lastName, email, role } } = isAuthenticate();

    const userLinks = () => {
        return (
            <div className="panel panel-default">
                <h4 className="panel-heading">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/carts">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/profile/update">Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userInfo = () => {
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

    const purchaseHistory = () => {
        return (
            <div className="panel panel-default mb=5">
                <h3 className="panel-heading">Purchase History</h3>
                <ul className="list-group">
                    <li className="list-group-item">History</li>
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
                            {userLinks()}
                        </div>
                        <div className="col-md-9">
                            {userInfo()}
                            {purchaseHistory()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard;