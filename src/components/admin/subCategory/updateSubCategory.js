import React, { useState, useEffect } from "react";
import Navigation from "../nav/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../util/api/category-apis";
import { updateSub, getSub } from "../../../util/api/sub-apis";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const UpdateSubCategory = ({ match, history }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState("");

    useEffect(() => {
        loadCategories();
        loadSub();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSub = () =>
        getSub(match.params.slug).then((s) => {
            setName(s.data.name);
            setParent(s.data.parent);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateSub(match.params.slug, { name, parent }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`${res.data.name} is updated`);
                history.push("/admin/sub/category");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
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
                        <h4>Update sub category</h4>
                    )}

                    <div className="form-group">
                        <label>Parent category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={(e) => setParent(e.target.value)}
                        >
                            <option>Please select</option>
                            {categories.length > 0 &&
                                categories.map((category, index) => (
                                    <option key={index} value={category._id} selected={category._id === parent}>
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {CategoryForm()}
                </div>
            </div>
        </div>
    );
};

export default UpdateSubCategory;
