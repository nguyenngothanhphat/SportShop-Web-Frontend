import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { createCategory, getCategories, removeCategory } from '../../../util/api/category-apis';
import Navigation from "../nav/navigation";
import HeaderAdmin from '../header/headerAdmin'

const CategoryCreate = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const { user } = useSelector(state => ({ ...state }))


    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => {
        getCategories().then(data => setCategories(data.data))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        createCategory({ name }, user.token)
            .then(res => {
                setLoading(false);
                setName("");
                toast.success(`${res.data.name} is created`);
                loadCategories();
            })
            .catch(err => {
                console.log("🚀 ~ file: createCategory.js ~ line 24 ~ handleSubmit ~ err", err)
                setLoading(false);
                if (err.response.status === 400) {
                    toast.error(err.response.data);
                }
            })
    }

    const handleRemove = async (slug) => {
        if (window.confirm("Do you want to delete it ?")) {
            setLoading(true);
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadCategories();
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    }
                })
        }
    }

    const categoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Category Name: </label>
                    <input type="text" className="form-control" onChange={e => setName(e.target.value)} value={name} autoFocus required />
                    <br />
                    <button className="btn btn-outline-primary">Add Category</button>
                </div>
            </form>
        )
    }

    return (
        <>
        <HeaderAdmin />
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 pl-0">
                    <Navigation />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Loading ...</h4>
                    ) : (
                        <h4>Create Category</h4>
                    )}
                    {categoryForm()}
                    <hr />
                    {categories.length > 0 && categories.map((category, index) => {
                        return (
                            <div className="alert alert-secondary" key={index}>
                                {category.name} <span onClick={() => handleRemove(category.slug)} className="btn btn-sm float-right"><DeleteOutlined className="text-danger" /></span>{" "}
                                <Link to={`/admin/category/${category.slug}`}><span className="btn btn-sm float-right"><EditOutlined className="text-danger" /></span></Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    );
};

export default CategoryCreate;
