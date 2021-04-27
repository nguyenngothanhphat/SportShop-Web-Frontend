/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Anchor, Drawer, Button, Badge } from "antd";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import Search from "../search/search";

// const { Link } = Anchor;

const Header = () => {
  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    // <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
    //   <Item key="home" icon={<AppstoreOutlined />}>
    //     <Link to="/">Home</Link>
    //   </Item>

    //   <Item key="filter" icon={<ShoppingOutlined />}>
    //     <Link to="/filter/product">Filter</Link>
    //   </Item>

    //   <Item key="cart" icon={<ShoppingCartOutlined />}>
    //     <Link to="/cart">
    //       <Badge count={cart.length} offset={[9, 0]}>
    //         Cart
    //       </Badge>
    //     </Link>
    //   </Item>

    //   {!user && (
    //     <Item key="register" icon={<UserAddOutlined />} className="float-right">
    //       <Link to="/register">Register</Link>
    //     </Item>
    //   )}

    //   {!user && (
    //     <Item key="login" icon={<UserOutlined />} className="float-right">
    //       <Link to="/login">Login</Link>
    //     </Item>
    //   )}

    //   {user && (
    //     <SubMenu
    //       icon={<SettingOutlined />}
    //       title={user.email && user.email.split("@")[0]}
    //       className="float-right"
    //     >
    //       {user && user.role === "subscriber" && (
    //         <Item icon={<ProfileOutlined />}>
    //           <Link to="/user/history">User Profile</Link>
    //         </Item>
    //       )}

    //       {user && user.role === "admin" && (
    //         <Item icon={<DashboardOutlined />}>
    //           <Link to="/admin/dashboard">Dashboard</Link>
    //         </Item>
    //       )}

    //       <Item icon={<LogoutOutlined />} onClick={logout}>
    //         Logout
    //       </Item>
    //     </SubMenu>
    //   )}
    //   <span className="float-right p-1">
    //         <Search />
    //   </span>
    // </Menu>
    <header>
      <div id="top-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7">
              <ul className="header-links pull-left">
                <li>
                  <Link>
                    <i className="fa fa-phone"></i> 0941992082
                  </Link>
                </li>
                <li>
                  <Link>
                    <i className="fas fa-envelope"></i> thanhphat19@gmail.com
                  </Link>
                </li>
                <li>
                  <Link>
                    <i className="fa fa-map-marker"></i> Pham Phu Thu
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-5">
              <ul className="header-links pull-right">
                {!user && (
                  <li>
                    <Link to="/login">
                      <i className="fa fa-dollar"></i> Login
                    </Link>
                  </li>
                )}

                {!user && (
                  <li>
                    <Link to="/register">
                      <i className="fa fa-dollar"></i> Register
                    </Link>
                  </li>
                )}
                {user && (
                  <li>
                    <Link onClick={logout}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </Link>
                  </li>
                )}
                {user && user && user.role === "Subscriber" && (
                  <li>
                    <Link to="/user/history">
                      <i className="fas fa-user"></i>{" "}
                      {user.email && user.email.split("@")[0]}
                    </Link>
                  </li>
                )}
                {user && user && user.role === "admin" && (
                  <li>
                    <Link to="/admin/dashboard">
                      <i className="fas fa-user"></i>{" "}
                      {user.email && user.email.split("@")[0]}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="header-logo">
                <Link to="/" className="logo">
                  {/* <img
                    src="https://images-platform.99static.com/5BxXBtjYaE26YEilreN-dMWuJGE=/95x94:895x894/500x500/top/smart/99designs-contests-attachments/115/115127/attachment_115127503"
                    style={{ width: "80%", marginTop: "-68px" }}
                    alt="logo"
                  /> */}
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="header-search">
               <Search />
              </div>
            </div>
            <div className="col-md-3 clearfix">
              <div className="header-ctn">
                <div>
                  <Link to="/user/wishlist">
                    <i className="fas fa-heart"></i>
                    <span>Your Wishlist</span>
                    <div className="qty">2</div>
                  </Link>
                </div>
                <div className="dropdown">
                  {/* <Badge count={cart.length} offset={[9, 0]} style={{ right: "9px" }}> */}
                  <Link
                    to="/cart"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="true"
                  >
                    <i className="fa fa-shopping-cart"></i>
                    <span>Your Cart</span>
                    <div className="qty">{cart.length}</div>
                  </Link>
                  {/* </Badge> */}

                  {/* <CartList carts={carts} /> */}
                </div>
                <div className="menu-toggle">
                  <Link>
                    <i className="fa fa-bars"></i>
                    <span>Menu</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
