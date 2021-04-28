import React, { Fragment } from "react";
import { Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import { useHistory, Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import {
  ShoppingCartOutlined,
  OrderedListOutlined,
  BlockOutlined,
  KeyOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Navigation = () => {
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
    <Layout>
      <Sider>
        <Menu defaultSelectedKeys={["Dashboard"]} mode="inline">
          <Menu.Item key="Dashboard">
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
          <SubMenu
            title={
              <span>
                <ShoppingCartOutlined />
                <span>Products</span>
              </span>
            }
          >
            <Menu.ItemGroup key="Product" title="Detail">
              <Menu.Item key="addProduct">
                <Link to="/admin/product">Add Product</Link>
              </Menu.Item>
              <Menu.Item key="viewProducts">
                <Link to="/admin/products">View All Products</Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>

          {user && user && user.role === "admin" && (
            <Fragment>
              <Menu.Item key="Category">
                <Link to="/admin/category">
                  <OrderedListOutlined />
                  Category
                </Link>
              </Menu.Item>

              <Menu.Item key="SubCategory">
                <Link to="/admin/sub/category">
                  <BlockOutlined />
                  Sub Category
                </Link>
              </Menu.Item>

              <Menu.Item key="Brand">
                <Link to="/admin/brand/category">
                  <i className="fas fa-archway mr-2"></i>
                  Brand
                </Link>
              </Menu.Item>

              <Menu.Item key="Coupon">
                <Link to="/admin/coupon">
                  <i className="fas fa-ticket-alt mr-2"></i>
                  Coupon
                </Link>
              </Menu.Item>
            </Fragment>
          )}

          <Menu.Item key="Password">
            <Link to="/admin/password">
              <i className="fas fa-key mr-2"></i>
              Password
            </Link>
          </Menu.Item>

          {user && user && user.role === "admin" && (
            <Menu.Item key="User">
              <Link to="/admin/users">
                <i className="fas fa-user mr-2"></i>
                User
              </Link>
            </Menu.Item>
          )}
          <Menu.Item key="Logout">
            <Link onClick={logout}>
            <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default Navigation;
