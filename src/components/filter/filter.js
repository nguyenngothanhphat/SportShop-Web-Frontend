import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../../util/api/product-apis";
import { useSelector, useDispatch } from "react-redux";
import CardProduct from "../card/cardProduct";
import { Menu, Slider } from "antd";
import { DollarOutlined } from "@ant-design/icons";

import Header from "../nav/header";

const { SubMenu, ItemGroup } = Menu;

const Filter = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);

  let { search } = useSelector((state) => ({ ...state }));

  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  /* Load products by default on page load */
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  /* Load products on user search input */
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h4>Search/Filter</h4>
            <hr />
            <Menu defaultOpenKeys={["1", "2"]} mode="inline">
              <SubMenu
                key="1"
                title={
                  <span className="h6">
                    <DollarOutlined /> Price
                  </span>
                }
              >
                <div>
                  <Slider
                    className="ml-4 mr-4"
                    tipFormatter={(v) => `$${v}`}
                    range
                    value={price}
                    onChange={(value) => setPrice(value)}
                    max="4990"
                  />
                </div>
              </SubMenu>
            </Menu>
          </div>

          <div className="col-md-9 p-2">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4 className="text-danger">Products</h4>
            )}

            {products.length < 1 && <p>No products found</p>}

            <div className="row pb-5">
              {products.map((p) => (
                <div key={p._id} className="col-md-4 mt-3">
                  <CardProduct product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
