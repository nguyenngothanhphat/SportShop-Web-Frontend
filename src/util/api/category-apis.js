import axios from 'axios';
import { API } from '../../config';

export const getCategories = async () =>
    await axios.get(`${API}/categories`);

export const getCategory = async (slug) =>
    await axios.get(`${API}/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
    await axios.delete(`${API}/category/${slug}`, {
        headers: {
            authtoken,
        },
    });

export const updateCategory = async (slug, category, authtoken) =>
    await axios.put(`${API}/category/${slug}`, category, {
        headers: {
            authtoken,
        },
    });

export const createCategory = async (category, authtoken) =>
    await axios.post(`${API}/category`, category, {
        headers: {
            authtoken,
        },
    });