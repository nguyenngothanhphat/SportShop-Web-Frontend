import React, { useState, useEffect } from "react";
import Resizer from 'react-image-file-resizer';
import axios from 'axios'
import { Select, Avatar, Badge } from "antd";
import Navigation from "../nav/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../util/api/product-apis";
import { getCategories, getCategorySubs } from "../../../util/api/category-apis";
import { getBrands } from '../../../util/api/brand-apis';
import { LoadingOutlined } from "@ant-design/icons";

import HeaderAdmin from '../header/headerAdmin'

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

const UpdateProduct = ({ match, history }) => {
    // state
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
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
    // router
    const { slug } = match.params;

    useEffect(() => {
        loadProduct();
        loadCategories();
        loadBrand();
    }, []);

    const loadProduct = () => {
        getProduct(slug).then((p) => {
            // console.log("single product", p);
            // 1 load single proudct
            setValues({ ...values, ...p.data });
            // 2 load single product category subs
            getCategorySubs(p.data.category._id).then((res) => {
                setSubOptions(res.data); // on first load, show default subs
            });
            // 3 prepare array of sub ids to show as default sub values in antd Select
            let arr = [];
            p.data.subs.map((s) => {
                arr.push(s._id);
            });
            console.log("ARR", arr);
            setArrayOfSubs((prev) => arr); // required for ant design select to work
        });
    };

    const loadCategories = () =>
        getCategories().then((c) => {
            console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
            setCategories(c.data);
        });

    const loadBrand = () => {
        getBrands().then(data => setBrands(data.data));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        values.subs = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`"${res.data.title}" is updated`, {position: "top-center"});
                history.push("/admin/products");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(err.response.data.err);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        setValues({ ...values, subs: [] });

        setSelectedBrand(e.target.value);

        getCategorySubs(e.target.value).then((res) => {
            console.log("SUB OPTIONS ON CATGORY CLICK", res);
            setSubOptions(res.data);
        });

        console.log("EXISTING CATEGORY values.category", values.category);

        if (values.category._id === e.target.value) {
            loadProduct();
        }
        setArrayOfSubs([]);
    };

    // const handleBrandChange = (e) => {
    //     e.preventDefault();
    //     setValues({ ...values, subs: [] });

    //     setSelectedCategory(e.target.value);

    //     getCategorySubs(e.target.value).then((res) => {
    //         console.log("SUB OPTIONS ON CATGORY CLICK", res);
    //         setSubOptions(res.data);
    //     });

    //     console.log("EXISTING CATEGORY values.category", values.category);

    //     if (values.category._id === e.target.value) {
    //         loadProduct();
    //     }
    //     setArrayOfSubs([]);
    // }

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
        <>
        <HeaderAdmin />
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 pl-0">
                    <Navigation />
                </div>

                <div className="col-md-10">
                    {loading ? (
                        <LoadingOutlined className="text-danger h1" />
                    ) : (
                        <h4>Product update</h4>
                    )}

                    {/* {JSON.stringify(values)} */}

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
                                value={shipping === "Yes" ? "Yes" : "No"}
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
                            <select
                                name="category"
                                className="form-control"
                                onChange={handleCategoryChange}
                                value={selectedCategory ? selectedCategory : category._id}
                            >
                                {categories.length > 0 &&
                                    categories.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <label>Sub Categories</label>
                            <Select
                                mode="multiple"
                                style={{ width: "100%" }}
                                placeholder="Please select"
                                value={arrayOfSubs}
                                onChange={(value) => setArrayOfSubs(value)}
                            >
                                {subOptions.length &&
                                    subOptions.map((s) => (
                                        <Option key={s._id} value={s._id}>
                                            {s.name}
                                        </Option>
                                    ))}
                            </Select>
                        </div>

                        <div className="form-group">
                            <label>Flavour</label>
                            <select
                                name="color"
                                value={color}
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
                                value={selectedBrand ? selectedBrand : brand._id}
                            >
                                <option>Please select</option>
                                {brands.length > 0 && brands.map((brand, index) => (
                                    <option key={brand._id} value={brand._id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button className="btn btn-outline-warning">Update Product</button>
                    </form>
                    <hr />
                </div>
            </div>
        </div>
        </>
    );
};

export default UpdateProduct;
