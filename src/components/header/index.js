import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from '../navbar/navbar';

import { logout, isAuthenticate } from '../../util/api/auth-apis';

const header = () => {
    
    return (
        <div>
            <Router>
                <Navbar />
            </Router>
        </div>
    )
}

export default header;