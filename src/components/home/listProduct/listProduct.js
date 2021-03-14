import React, { useState, useEffect } from 'react';
import { getProducts } from '../../../util/api/product-apis';
import Card from '../../core/Card/card';

const ListProduct = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            // console.log("🚀 ~ file: listProduct.js ~ line 22 ~ getProducts ~ data", data)
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        })
    }

    useEffect(() => {
        loadProductsBySell();
        loadProductsByArrival();
    }, []);

    return (
        <div className="container-fluid">
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.products && productsBySell.products.map((product, index) => (
                    <Card key={index} product={product} />
                ))}
            </div>
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.products && productsByArrival.products.map((product, index) => {
                    return (
                        <Card key={index} product={product} />
                    )
                })}
            </div>
        </div>
    )
}

export default ListProduct;