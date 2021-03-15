import React, { useState, useEffect } from 'react';
import { getCategories } from "../../../util/api/category-apis";
import { searchProduct } from "../../../util/api/product-apis";
import Card from "../Card/card";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log("🚀 ~ file: search.js ~ line 17 ~ getCategories ~ data.error", data.error)
            } else {
                setData({ ...data, categories: data })
            }
        })
    }

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        // console.log(search, category);
        if (search) {
            searchProduct({ search: search || undefined, category: category })
                .then(res => {
                console.log("🚀 ~ file: search.js ~ line 36 ~ searchData ~ res", res)
                    if (res.error) {
                        console.log("🚀 ~ file: search.js ~ line 37 ~ searchData ~ res.error", res.error);
                    } else {
                        setData({ ...data, results: res, searched: true });
                    }
                })
        }
    }

    const searchSubmit = (event) => {
        event.preventDefault()
        searchData()
    }

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    }

    const searchedProducts = (results = []) => {
        return (
            <div className="row">
                {results.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
        )
    }

    const searchForm = () => {
        return (
            <form onSubmit={searchSubmit}>
                <span className="input-group-text">
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <select className="btn mr-2" onChange={handleChange('category')}>
                                <option value="All">Pick Category</option>
                                {categories.data &&
                                    categories.data.map((c, i) => (
                                        <option key={i} value={c._id}>
                                            {c.categoryName}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <input type="search" className="form-control" onChange={handleChange('search')} placeholder="Search by name" />
                    </div>
                    <div className="btn input-group-append" style={{ border: 'none' }}>
                        <button className="input-group-text">Search</button>
                    </div>
                </span>
            </form>
        )
    }
    return (
        <div className="row">
            <div className="container mb-3">
                {searchForm()}
            </div>
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    )
}

export default Search;