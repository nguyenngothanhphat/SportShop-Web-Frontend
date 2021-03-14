import React, { useState } from 'react';
import { isAuthenticate } from '../../../util/api/auth-apis';
import { Link } from 'react-router-dom';
import { createCategory } from '../../../util/api/category-apis';

import Header from '../../header/index';

const AddCategory = () => {
    const [values, setValues] = useState({
        categoryName: "",
        description: "",
        error: "",
        success: false,
    });

    const { categoryName, description, success, error } = values;

    const { user, token } = isAuthenticate();

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false });

        /* Make request to api to create category */
        createCategory(user._id, token, { categoryName, description }).then(data => {
            console.log("🚀 ~ file: addCategory.js ~ line 30 ~ createCategory ~ data", data)
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({
                    ...values,
                    categoryName: "",
                    description: "",
                    error: "",
                    success: true,
                });
            }
        })
    }

    const addCategoryForm = () => {
        return (
            <div className="cate-container">
                <h1 className="cate-title">Category</h1>
                <label className="custom-field">
                    <input type="text" name="categoryName" id="categoryName" onChange={handleChange('categoryName')} value={categoryName} autoFocus required />
                    <span className="placeholder">Category Name: </span>
                </label>
                <label className="custom-field">
                    <input type="text" name="description" id="description" onChange={handleChange('description')} value={description} autoFocus required />
                    <span className="placeholder">Category Description</span>
                </label>
                <button onClick={clickSubmit} className="button-add-category" type="submit">Add Category</button>
            </div>
        )
    }

    // const showSuccess = () => {
    //     <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
    //         Category created
    //     </div>
    // }

    // const showError = () => {

    //     <div
    //         className="alert alert-danger"
    //         style={{ display: error ? "" : "none" }}
    //     >
    //         {error}
    //     </div>

    // }

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to="/dashboard" className="text-warning">Back to Dashboard</Link>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            {/* {showSuccess()}
                            {showError()} */}
                            {addCategoryForm()}
                            {goBack()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCategory;