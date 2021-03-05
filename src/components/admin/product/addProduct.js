import React, { useState, useEffect } from 'react';
import { isAuthenticate } from '../../../util/api/auth-apis';
import { Link } from 'react-router-dom';
import { createProduct } from '../../../util/api/product-apis';

import Header from '../../header/index';
import Footer from '../../footer/index';

const AddProduct = () => {
    const {user, token} = isAuthenticate();
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
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
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
        shipping,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const newPostForm = () => {
        return (
            <form className="mb-3">
                <h4>Post Photo</h4>
                <div className="form-group">
                    <label className="btn btn-secondary">
                        <input type="file" name="image" accept="image/*" />
                    </label>
                </div>
                <div className="form-group">
                    <label className="text-muted">Product Name:</label>
                    <input onChange={handleChange()} type="text" className="form-control" value={name} />
                </div>
            </form>
        )
    }
    return (
        <div>
            <Header />
            <div className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            abc
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default AddProduct;