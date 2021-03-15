import { API } from '../../config';
import queryString from 'query-string'

export const getProducts = (sortBy) => {
    return fetch(`${API}/admin/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log("🚀 ~ file: product-apis.js ~ line 11 ~ getProducts ~ err", err)
        })
}

export const searchProduct = params => {
    const query = queryString.stringify(params)
    console.log("🚀 ~ file: product-apis.js ~ line 18 ~ query", query)
    return fetch(`${API}/products?${query}`, {
        method: "GET"
    })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log("🚀 ~ file: product-apis.js ~ line 24 ~ err", err)
        })
}

export const createProduct = (userId, token, product) => {
    console.log("🚀 ~ file: product-apis.js ~ line 4 ~ createProduct ~ product", product)
    return fetch(`${API}/admin/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(res => {
        console.log("🚀 ~ file: product-apis.js ~ line 15 ~ createProduct ~ res", res)
        return res.json();
    }).catch(err => {
        console.log("🚀 ~ file: product-apis.js ~ line 14 ~ createProduct ~ err", err);
    })
}