import React, { useState } from "react";
import { Anchor, Drawer, Button, Badge } from "antd";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import Search from "../search/search";

// const { Link } = Anchor;

const Header = () => {
  const [visible, setVisible] = useState(false);

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

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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

    // <div className="container-fluid">
    //   <div className="header">
    //     <div className="logo">
    //       <i className="fas fa-bolt"></i>
    //       <a href="/">Thanh Phat</a>
    //     </div>
    //     <div className="mobileHidden">
    //       <Anchor targetOffset="65">
    //         <Link href="/" title="Home" />
    //         <Link href="/filter/product" title="Promotions" />
    //         <Link href="/filter/product" title="Product" />
    //         <Link href="/filter/product" title="Accessories" />
    //         <Link href="#" title="Blog" />
    //         <Link href="#" title="Contact us" />
    //         <Badge count={cart.length} offset={[9, 0]} style={{ right: "9px" }}>
    //           <Link href="/cart" title="Cart" />
    //         </Badge>
    //         {!user && <Link href="/login" title="Login" />}

    //         {!user && <Link href="/register" title="Register" />}

    //         {user && <Link title={user.email && user.email.split("@")[0]} />}

    //       </Anchor>
    //     </div>
    //     <div className="mobileVisible">
    //       <Button type="primary" onClick={showDrawer}>
    //         <i className="fas fa-bars"></i>
    //       </Button>
    //       <Drawer
    //         placement="right"
    //         closable={false}
    //         onClose={onClose}
    //         visible={visible}
    //       >
    //         <Anchor targetOffset="65">
    //           <Link href="#hero" title="Home" />
    //           <Link href="#about" title="About" />
    //           <Link href="#feature" title="Features" />
    //           <Link href="#works" title="How it works" />
    //           <Link href="#faq" title="FAQ" />
    //           <Link href="#pricing" title="Pricing" />
    //           <Link href="#contact" title="Contact" />
    //         </Anchor>
    //       </Drawer>
    //     </div>
    //   </div>
    // </div>
    <header>
      <div id="top-header">
        <div className="container">
          <ul className="header-links pull-left">
            <li>
              <Link>
                <i className="fa fa-phone"></i> +021-95-51-84
              </Link>
            </li>
            <li>
              <Link>
                <i className="fa fa-envelope-o"></i> thanhphat19@gmail.com
              </Link>
            </li>
            <li>
              <Link>
                <i className="fa fa-map-marker"></i> Pham Phu Thu
              </Link>
            </li>
          </ul>
          <ul className="header-links pull-right">
            <li>
              <Link>
                <i className="fa fa-dollar"></i> USD
              </Link>
            </li>
            <li>
              <Link>
                <i className="fa fa-user-o"></i> My Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
