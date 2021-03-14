import React, { useState, useEffect, useRef } from "react";
import { isAuthenticate } from "../../../util/api/auth-apis";
import { Link } from "react-router-dom";
import { createProduct } from "../../../util/api/product-apis";
import { getCategories } from "../../../util/api/category-apis";

import Header from "../../header/index";

const AddProduct = () => {
  const [values, setValues] = useState({
    productName: '',
    productRate: '',
    price: '',
    description: '',
    category: '',
    brand: '',
    quantity: '',
    productImage: '',
    shipping: '',
    productStatus: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
  });

  const form = useRef(null)

  const [categories, setCategories] = useState([]);

  const [brands, setBrand] = useState([]);
  const { user, token } = isAuthenticate();
  const {
    productName,
    productRate,
    price,
    description,
    category,
    brand,
    quantity,
    shipping,
    productStatus,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data.data)
      }
    });
  };

  useEffect(() => {
    init();
  }, []);


  const handleChange = name => event => {
    const value = name === "productImage" ? event.target.files[0] : event.target.value;
    // formData.set(name, value);
    // console.log("🚀 ~ file: addProduct.js ~ line 74 ~ AddProduct ~ options", options)
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    const data = new FormData(form.current)
    // for(let [name, value] of data) {
    //   alert( value); // key1 = value1, then key2 = value2
    // }
    createProduct(user._id, token, data).then((data) => {
      console.log("🚀 ~ file: addProduct.js ~ line 66 ~ createProduct ~ data", data)
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          productName: '',
          productRate: '',
          price: '',
          description: '',
          quantity: '',
          productImage: '',
          productStatus: '',
          loading: false,
          createdProduct: data.productName
        });
      }
    });
  };

  const newPostForm = () => (
    <form onSubmit={clickSubmit} ref={form}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("productImage")}
            type="file"
            name="productImage"
            accept="images/*"
          />
        </label>
      </div>
      <label>{formData}</label>
      <div className="form-group">
        <label className="text-muted">Product Name:</label>
        <input
          onChange={handleChange("productName")}
          type="text"
          className="form-control"
          name="productName"
          value={productName}
        // value={productName}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Product Description:</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          name="description"
          value={description}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Product Rate:</label>
        <input
          onChange={handleChange("productRate")}
          type="number"
          className="form-control"
          name="productRate"
          value={productRate}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Product Price:</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          name="price"
          value={price}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category:</label>
        <select onChange={handleChange("category")} className="form-group" name="category" >
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.categoryName}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Brand:</label>
        <select onChange={handleChange("brand")} className="form-group" name="brand">
          <option value="5fef2f5cfe689a3cc03e0361">Select</option>
          <option value="5fef2f5cfe689a3cc03e0361">MyProtein</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity:</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Status:</label>
        <input
          onChange={handleChange("productStatus")}
          type="text"
          className="form-control"
          name="productStatus"
          value={productStatus}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Shipping:</label>
        <select onChange={handleChange("shipping")} className="form-group" name="shipping">
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <button className="btn btn-outline-primary" type="submit">Create Product</button>
    </form >

  );

  return (
    <div>
      <Header />
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {newPostForm()}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AddProduct;
