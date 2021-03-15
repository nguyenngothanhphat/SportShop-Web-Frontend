import { API } from "../../config";

export const getCategories = () => {
    return fetch(`${API}/admin/category`, {
        method: 'GET'
    })
        .then(res => {
        console.log("🚀 ~ file: category-apis.js ~ line 8 ~ getCategories ~ res", res)
            return res.json();
        })
        .catch(err => console.log(err))
};

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/admin/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    })
        .then(res => {
            console.log("🚀 ~ file: category-apis.js ~ line 15 ~ createCategory ~ res", res);
            return res.json();
        })
        .catch(err => {
            console.log("🚀 ~ file: category-apis.js ~ line 19 ~ createCategory ~ err", err);
        })
}

export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/admin/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log("🚀 ~ file: category-apis.js ~ line 37 ~ updateCategory ~ err", err));
}