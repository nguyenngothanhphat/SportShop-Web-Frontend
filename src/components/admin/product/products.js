import React, { useState, useEffect } from "react";

import Navigation from '../nav/navigation';
import ProductCard from '../card/productCard';

import { getProductsByCount, removeProduct } from '../../../util/api/product-apis';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadAllProduct();
    }, [])

    const loadAllProduct = () => {
        setLoading(true);
        getProductsByCount(100)
            .then(res => {
                setProducts(res.data)
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleRemove = (slug) => {
        let answer = window.confirm("Delete ?");

        if (answer) {
            removeProduct(slug, user.token)
                .then(res => {
                    loadAllProduct();
                    toast.error(`${res.data.title} is deleted`);
                })
                .catch(err => {
                    console.log("🚀 ~ file: products.js ~ line 39 ~ handleRemove ~ err", err)
                    if (err.response.status === 400) {
                        toast.error(err.response.data)
                    }
                })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Navigation />
                </div>

                <div className="col">
                    <div className="row">
                        {loading ? (
                            <h4 className="text-danger">Loading ...</h4>
                        ) : (
                            <h4>All Products</h4>
                        )}
                    </div>
                    <div className="row">
                        {products.map((product, index) => {
                            return (
                                <div key={index} className="col-md-4 pb-3">
                                    <ProductCard product={product} handleDelete={handleRemove} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
