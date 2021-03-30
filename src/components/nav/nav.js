import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav id="navigation">
            <div className="container">
                <div id="responsive-nav">
                    <ul className="main-nav nav navbar-nav">
                        <li className="active"><Link to='/'>Home</Link></li>
                        <li><Link to='/ProductByCategory'>Categories</Link></li>
                        <li><Link to='/ProductByCategory?categoryId=0'>Laptop</Link></li>
                        <li><Link to='/ProductByCategory?categoryId=0'>SmartPhone</Link></li>
                        <li><Link to='/ProductByCategory?categoryId=0'>Accessories</Link></li>
                        <li><Link to='/Compare'>Compare</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav;