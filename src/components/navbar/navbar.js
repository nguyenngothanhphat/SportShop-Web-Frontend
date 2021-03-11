import React, { useState } from 'react'
import Button from '../button/button'
import { Link } from 'react-router-dom'
import './navbar.css'
import Dropdown from '../dropdown/dropdown';

const Navbar = () => {
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
      <nav className="navbar">
        <Link to="/" className="navbar-logo">TP Store</Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Hone
            </Link>
          </li>
          <li className="nav-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Link to="/khuyenmai" className="nav-links" onClick={closeMobileMenu}>
              Khuyến mãi <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className="nav-item">
            <Link to="/thuonghieu" className="nav-links" onClick={closeMobileMenu}>
              Thương hiệu <i className='fas fa-caret-down' />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sanpham" className="nav-links" onClick={closeMobileMenu}>
              Sản phẩm <i className='fas fa-caret-down' />
            </Link>
            
          </li>
          <li className="nav-item">
            <Link to="/phukien" className="nav-links" onClick={closeMobileMenu}>
              Phụ kiện <i className='fas fa-caret-down' />
            </Link>
            
          </li>
        </ul>
        <Button />
      </nav>
    </>
  )
}

export default Navbar;