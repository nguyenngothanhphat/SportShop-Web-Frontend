import React, { useState } from 'react';
import { isAuthenticate } from '../../../util/api/auth-apis';
import { Link } from 'react-router-dom';
import { createCategory } from '../../../util/api/category-apis';

import Header from '../../header/index';
import Footer from '../../footer/index';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // const [values, setValues] = useState({
    //     name: "",
    //     description: "",
    // })
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticate();

    const handleChange = (name) => (event) => {
        setError('');
        setName({ [name]: event.target.value });
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);

        /* Make request to api to create category */
        createCategory(user._id, token, { name, description }).then(data => {
            if (data.error) {
                setError(true);
            } else {
                setError('');
                setSuccess(true);
            }
        })
    }

    const addCategoryForm = () => {
        return (
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <input type="text" className="form-control" onChange={handleChange} value={description} autoFocus required />
                </div>
                <button className="btn btn-outline-primary">Add</button>
            </form>
        )
    }

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is created</h3>;
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">{name} is should be unique</h3>;
        }
    }

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
                            {showSuccess()}
                            {showError()}
                            {addCategoryForm()}
                            {goBack()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddCategory; 