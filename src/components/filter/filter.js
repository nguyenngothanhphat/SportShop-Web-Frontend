import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../../util/api/product-apis";
import { getCategories } from '../../util/api/category-apis'
import { getSubs } from '../../util/api/sub-apis'
import { getBrands } from '../../util/api/brand-apis';
import { useSelector, useDispatch } from "react-redux";
import CardProduct from "../card/cardProduct";
import { Menu, Slider, Checkbox, Radio } from "antd";
import { DollarOutlined, DownSquareOutlined, StarOutlined } from "@ant-design/icons";
import Star from '../star/star';

import Header from "../nav/header";

const { SubMenu, ItemGroup } = Menu;

const Filter = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState(["Chocolate", "Chocolate Coconut", "Vanilla Espresso", "Mojito", "Orange mango", "Peach Tea", "Banana", "Blueberry", "Chocolate mint", "Milk Tea", "White Chocolate", "Chocolate Mint", "Chocolate Smooth"])
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();

  let { search } = useSelector((state) => ({ ...state }));

  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    loadCategories();
    // fetch subcategories
    loadSubs();
    loadBrands();
  }, []);

  /* Load products by default on page load */
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  const loadSubs = () => {
    getSubs().then((res) => setSubs(res.data));
  }

  const loadCategories = () => {
    getCategories().then(res => setCategories(res.data))
  }

  const loadBrands = () => {
    getBrands().then(res => setBrands(res.data))
  }

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

  /* Load products based on price range */
  useEffect(() => {
    console.log("ok to request products");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    fetchProducts({ sub });
  };

  const showBrands = () => {
    brands.map((brand) => (
      <div key={brand._id} onClick={() => handleBrand(brand)} className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}>
        {brand.name}
      </div>
    ))
  }

  const handleBrand = (brand) => {
    console.log("Brand", brand);
    setBrand(brand);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    fetchProducts({ brand });
  };

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    // setShipping("");
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-2">
            <h4>Search/Filter</h4>
            <hr />
            <Menu defaultOpenKeys={["1", "2", "3", "4", "5"]} mode="inline">
              {/* Price range */}
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
                    onChange={handleSlider}
                    max="4990"
                  />
                </div>
              </SubMenu>

              {/* Filter categories */}
              <SubMenu
                key="2"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Categories
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
              </SubMenu>

              {/* stars */}
              <SubMenu
                key="3"
                title={
                  <span className="h6">
                    <StarOutlined /> Rating
                </span>
                }
              >
                <div style={{ maringTop: "-10px" }}>{showStars()}</div>
              </SubMenu>

              {/* sub category */}
              <SubMenu
                key="4"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Sub Categories
                </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                  {showSubs()}
                </div>
              </SubMenu>

              {/* brand */}
              <SubMenu
                key="5"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Brand
                </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                  {showBrands()}
                </div>
              </SubMenu>

              {/* smell */}
              <SubMenu
                key="6"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Smell
                </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                  {showColors()}
                </div>
              </SubMenu>

              {/* shipping */}
              <SubMenu
                key="7"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Shipping
                </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                  {showShipping()}
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
