import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';


import Dropdown from '../dropdown/dropdown';

import { logout, isAuthenticate } from '../../util/api/auth-apis';

const Header = () => {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    return (
        <>
            <nav className="navigation">
                <Link to="/" className="navigation--logo">TP Store</Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'navigation--menu active' : 'navigation--menu'}>
                    <li className="navigation--item">
                        <Link to="/" className="navigation--links" onClick={closeMobileMenu}>
                            Hone
            </Link>
                    </li>
                    <li className="navigation--item">
                        <Link to="/khuyenmai" className="navigation--links" onClick={closeMobileMenu}>
                            Khuyến mãi <i className='fas fa-caret-down' />
                        </Link>
                    </li>
                    <li className="navigation--item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <Link to="/thuonghieu" className="navigation--links" onClick={closeMobileMenu}>
                            Thương hiệu <i className='fas fa-caret-down' />
                        </Link>
                        {dropdown && <Dropdown />}
                    </li>
                    <li className="navigation--item">
                        <Link to="/sanpham" className="navigation--links" onClick={closeMobileMenu}>
                            Sản phẩm <i className='fas fa-caret-down' />
                        </Link>
                    </li>
                    <li className="navigation--item">
                        <Link to="/phukien" className="navigation--links" onClick={closeMobileMenu}>
                            Phụ kiện <i className='fas fa-caret-down' />
                        </Link>
                    </li>
                </ul>
                {/* <Button /> */}
                <Link to='/signin'>
                    <button className="button-signin">Sign In</button>
                </Link>
            </nav>
        </>
    )
}

export default Header;