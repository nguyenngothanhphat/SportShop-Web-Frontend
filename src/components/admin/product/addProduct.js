import React, { useState, useEffect } from "react";
import { isAuthenticate } from "../../../util/api/auth-apis";
import { Link } from "react-router-dom";
import { createProduct } from "../../../util/api/product-apis";
import { getCategories } from "../../../util/api/category-apis";

import Header from "../../header/index";
import Footer from "../../footer/index";

const AddProduct = () => {

  const [values, setValues] = useState({
    name: '',
    rate: '',
    price: '',
    description: '',
    categories: [],
    category: '',
    brands: [],
    brand: '',
    quantity: '',
    image: '',
    shipping: '',
    status: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  });

  const { user, token } = isAuthenticate();
  const {
    name,
    rate,
    price,
    description,
    categories,
    category,
    brands,
    brand,
    quantity,
    image,
    shipping,
    status,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories().then(data => {
      console.log("🚀 ~ file: addProduct.js ~ line 55 ~ getCategories ~ data", data)
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);


  const handleChange = name => event => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    // console.log("formData", formData);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProduct(user._id, token, formData).then((data) => {
      console.log("🚀 ~ file: addProduct.js ~ line 66 ~ createProduct ~ data", data)
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          rate: '',
          price: '',
          description: '',
          quantity: '',
          image: '',
          status: '',
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  console.log("abc", categories);

  const newPostForm = () => (

    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("image")}
            type="file"
            name="image"
            accept="image/*"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Product Name:</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Product Description:</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Product Rate:</label>
        <input
          onChange={handleChange("rate")}
          type="number"
          className="form-control"
          value={rate}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Product Price:</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category:</label>
        <select onChange={handleChange("category")} className="form-group">
          <option>Select Options</option>
          {
            categories.map((c, i) => {
              return (
                <option key={i} value={c._id}>
                  {c.categoryName}
                </option>
              )
            })}
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Brand:</label>
        <select onChange={handleChange("brand")} className="form-group">
          <option value="5fef2f5cfe689a3cc03e036105">Select</option>
          <option value="5fef2f5cfe689a3cc03e036105">MyProtein</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity:</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Status:</label>
        <input
          onChange={handleChange("status")}
          type="text"
          className="form-control"
          value={status}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Shipping:</label>
        <select onChange={handleChange("shipping")} className="form-group">
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <button className="btn btn-outline-primary">Create Product</button>
    </form>

  );

  return (
    <div>
      <Header />
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">{newPostForm()}</div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AddProduct;
