import React, { useState } from "react";
import { Layout, Avatar, Menu, Icon, Breadcrumb, Button } from "antd";
import {
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
// import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navigation from '../nav/navigation'

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu, Item } = Menu;

const HeaderAdmin = () => {
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

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
    <>
      <Layout>
        <Header style={{ padding: 10 }}>
          {/* <Avatar style={{ float: "right" }} src="./dp.png" /> */}
          {/* <Menu>
          {user && (
            <SubMenu
              icon={<SettingOutlined />}
              title={user.email && user.email.split("@")[0]}
              className="float-right"
            >
              <Item icon={<ProfileOutlined />}>
                <Link to="/">User Profile</Link>
              </Item>

              <Item icon={<LogoutOutlined />} onClick={logout}>
                Logout
              </Item>
            </SubMenu>
          )} 
          </Menu> */}

          <Title style={{ color: "white" }} level={3}>
            THANHPHAT Admin
          </Title>
        </Header>
      </Layout>
    </>
  );
};

export default HeaderAdmin;
