import React, { useState, useEffect } from 'react';
import { isAuthenticate } from '../../../util/api/auth-apis';
import { getCategories, getSubs, createSub } from '../../../util/api/category-apis';

import Header from '../../header/index';

const AddSubCategory = () => {
    const [subCategoryName, setSubCategoryName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [subs, setSubs] = useState([]);;

    const { user, token } = isAuthenticate();

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, []);

    const loadCategories = () => {
        getCategories().then((data) => setCategories(data.data));
    }

    const loadSubs = () => {
        getSubs().then(data => setSubs(data.data));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        createSub({ subCategoryName, parent: category }, token)
            .then(res => {
                setLoading(false);
                setSubCategoryName("");
                loadSubs();
            })
            .catch(err => {
                console.log("🚀 ~ file: addSubCategory.js ~ line 39 ~ handleSubmit ~ err", err)
                setLoading(false);
            })
    }

    const categoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Sub Category Name:</label>
                    <input type="text" className="form-control" onChange={e => setSubCategoryName(e.target.value)} value={subCategoryName} autoFocus required />
                    <br />
                    <button className="btn btn-outline-primary">Save</button>
                </div>
            </form>
        )
    }
    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        SideBar
                    </div>
                    <div className="col">
                        {loading ? (
                            <h4 className="text-danger">Loading ...</h4>
                        ) : (
                            <h4>Create Sub Category</h4>
                        )}
                        <div className="form-group">
                            <label>Parent Category</label>
                            <select name="category" className="form-control" onChange={e => setCategory(e.target.value)}>
                                <option>Please Select</option>
                                {categories.length > 0 && categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {categoryForm()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSubCategory;