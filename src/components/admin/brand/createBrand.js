import React, { useState, useEffect } from "react";
import Navigation from "../nav/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../util/api/category-apis";
import { createBrand, getBrands, removeBrand } from "../../../util/api/brand-apis";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import HeaderAdmin from '../header/headerAdmin'

const CreateBrand = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        loadCategories();
        loadBrands();
    }, []);

    const loadCategories = () =>
        getCategories().then((data) => setCategories(data.data));

    const loadBrands = () => {
        getBrands().then(data => setBrands(data.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        createBrand({ name, parent: category }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`${res.data.name} is created`);
                loadBrands();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = async (slug) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeBrand(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadBrands();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    }
                });
        }
    };

    const CategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Brand Name: </label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                    required
                />
                <br />
                <button className="btn btn-outline-primary">Add Brand</button>
            </div>
        </form>
    );

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
                        <h4 className="text-danger">Loading..</h4>
                    ) : (
                        <h4>Create Brand</h4>
                    )}

                    <div className="form-group">
                        <label>Parent category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Please select</option>
                            {categories.length > 0 &&
                                categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {CategoryForm()}
                    <hr />
                    {brands.length > 0 && brands.map((brand, index) => {
                        return (
                            <div className="alert alert-secondary" key={index}>
                                {brand.name} <span onClick={() => handleRemove(brand.slug)} className="btn btn-sm float-right"><DeleteOutlined className="text-danger" /></span>{" "}
                                <Link to={`/admin/brand/${brand.slug}`}><span className="btn btn-sm float-right"><EditOutlined className="text-danger" /></span></Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    );
};

export default CreateBrand;
