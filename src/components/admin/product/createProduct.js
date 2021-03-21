import React, { useState, useEffect } from "react";
import Resizer from 'react-image-file-resizer';
import axios from 'axios'
import { Select, Avatar, Badge } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Navigation from "../nav/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../util/api/product-apis";
import { getCategories, getCategorySubs } from "../../../util/api/category-apis";
import { getBrands } from '../../../util/api/brand-apis';

import { API } from '../../../config'

const { Option } = Select

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    brands: [],
    brand: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Chocolate", "Chocolate Coconut", "Vanilla Espresso", "Mojito", "Orange mango", "Peach Tea", "Banana", "Blueberry", "Chocolate mint", "Milk Tea", "White Chocolate", "Chocolate Mint", "Chocolate Smooth"],
    color: "",
};

const CreateProduct = () => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        title,
        description,
        price,
        // categories,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        // brands,
        color,
        brand,
    } = values;

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
        loadBrands();
    }, [])

    const loadCategories = () => {
        getCategories().then(c => setCategories(c.data))
    }

    const loadBrands = () => {
        getBrands().then(b => setBrands(b.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then((res) => {
                console.log(res);
                window.alert(`"${res.data.title}" is created`);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.err);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleCatagoryChange = (e) => {
        e.preventDefault();
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value).then((res) => {
            setSubOptions(res.data);
        });
        setShowSub(true)
    };

    const fileUploadAndResize = (e) => {
        let files = e.target.files;
        let allUploadedFiles = values.images;
        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (url) => {
                        axios.post(`${API}/uploadimages`, { image: url }, {
                            headers: {
                                authtoken: user ? user.token : ""
                            }
                        })
                            .then(res => {
                                console.log("🚀 ~ file: createProduct.js ~ line 118 ~ fileUploadAndResize ~ res", res)
                                setLoading(false)
                                allUploadedFiles.push(res.data);

                                setValues({ ...values, images: allUploadedFiles })
                            })
                            .catch(err => {
                                setLoading(false);
                                console.log("🚀 ~ file: createProduct.js ~ line 127 ~ fileUploadAndResize ~ err", err)
                            })
                    },
                    "base64"
                );
            }
        }
    }

    const handleImageRemove = (public_id) => {
        setLoading(true);
        axios.post(`${API}/removeimage`, { public_id }, {
            headers: {
                authtoken: user ? user.token : "",
            },
        })
            .then((res) => {
                setLoading(false);
                const { images } = values;
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id;
                });
                setValues({ ...values, images: filteredImages });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Navigation />
                </div>

                <div className="col-md-10">
                    {loading ? (
                        <LoadingOutlined className="text-danger" />
                    ) : (
                        <h4>Product create</h4>
                    )}

                    <hr />

                    <form onSubmit={handleSubmit}>
                        <div className="p-3">
                            <div className="row">
                                {values.images && values.images.map((image, index) => {
                                    return (
                                        <Badge key={image.public_id} count="X" onClick={() => handleImageRemove(image.public_id)} style={{ pointer: "cursor" }}>
                                            <Avatar className="m-3" src={image.url} size={100} shape="square" className="ml-3" />
                                        </Badge>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                className="form-control"
                                value={description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="p-3">
                            <div className="row">
                                <label className="btn btn-primary">
                                    Choose File
                                    <input type="file" multiple hidden accept="images/*" onChange={fileUploadAndResize} />
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                name="price"
                                className="form-control"
                                value={price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Shipping</label>
                            <select
                                name="shipping"
                                className="form-control"
                                onChange={handleChange}
                            >
                                <option>Please select</option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                className="form-control"
                                value={quantity}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" className="form-control" onChange={handleCatagoryChange}>
                                <option>Please select</option>
                                {categories.length > 0 && categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {showSub ? (
                            <div className="form-group">
                                <label>Sub Category</label>
                                <Select mode="multiple" style={{ width: '100%' }} placeholder="Please select" value={subs} onChange={value => setValues({ ...values, subs: value })}>
                                    {subOptions.length > 0 && subOptions.map((subOption, index) => {
                                        return (
                                            <Option key={index} value={subOption._id}>
                                                {subOption.name}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        ) : null}

                        <div className="form-group">
                            <label>Flavour</label>
                            <select
                                name="color"
                                className="form-control"
                                onChange={handleChange}
                            >
                                <option>Please select</option>
                                {colors.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Brand</label>
                            <select
                                name="brand"
                                className="form-control"
                                onChange={handleChange}
                            >
                                <option>Please select</option>
                                {brands.length > 0 && brands.map((brand, index) => (
                                    <option key={brand._id} value={brand._id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button className="btn btn-outline-info">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;

