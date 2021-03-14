import { API } from "../../config";

export const getBrands = () => {
    return fetch(`${API}/admin/category`, {
        method: 'GET'
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
};