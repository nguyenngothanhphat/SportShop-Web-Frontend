import React, { useState, useEffect } from "react";
import Navigation from "../nav/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../util/api/category-apis";
import { createSub, getSubs, removeSub } from "../../../util/api/sub-apis";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CreateSubCategory = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSubs = () => {
        getSubs().then(data => setSubs(data.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
                loadSubs();
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
            removeSub(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadSubs();
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
                <label>Sub Category Name: </label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                    required
                />
                <br />
                <button className="btn btn-outline-primary">Add Sub Category</button>
            </div>
        </form>
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Navigation />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Loading..</h4>
                    ) : (
                        <h4>Create Sub Category</h4>
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
                    {subs.length > 0 && subs.map((sub, index) => {
                        return (
                            <div className="alert alert-secondary" key={index}>
                                {sub.name} <span onClick={() => handleRemove(sub.slug)} className="btn btn-sm float-right"><DeleteOutlined className="text-danger" /></span>{" "}
                                <Link to={`/admin/sub/${sub.slug}`}><span className="btn btn-sm float-right"><EditOutlined className="text-danger" /></span></Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CreateSubCategory;
