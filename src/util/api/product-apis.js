import { API } from '../../config';

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/admin/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(res => {
        return res.json();
    }).catch(err => {
        console.log("🚀 ~ file: product-apis.js ~ line 14 ~ createProduct ~ err", err);
    })
}