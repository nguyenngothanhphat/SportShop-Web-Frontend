import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import {
  ShoppingCartOutlined,
  OrderedListOutlined,
  BlockOutlined,
  KeyOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Navigation = () => (
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
            <KeyOutlined />
            Brand
          </Link>
        </Menu.Item>

        <Menu.Item key="Coupon">
          <Link to="/admin/coupon">
            <KeyOutlined />
            Coupon
          </Link>
        </Menu.Item>

        <Menu.Item key="Password">
          <Link to="/user/password">
            <KeyOutlined />
            Password
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  </Layout>
);

export default Navigation;
