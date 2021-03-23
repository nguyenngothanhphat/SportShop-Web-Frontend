import axios from "axios";
import { API } from '../../config';

export const createProduct = async (product, authtoken) =>
  await axios.post(`${API}/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductsByCount = async (count) => {
  return await axios.get(`${API}/products/${count}`);
}

export const removeProduct = async (slug, authtoken) => {
  return await axios.delete(`${API}/product/${slug}`, {
    headers: {
      authtoken,
    }
  })
}

export const getProduct = async (slug) => {
  return await axios.get(`${API}/product/${slug}`)
}

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const getProducts = async (sort, order, page) => {
  return await axios.post(`${API}/products`, {
    sort,
    order,
    page,
  })
}

export const getProductsCount = async () => {
  return await axios.get(`${API}/products/total`)
}

export const productStar = async (productId, star, authtoken) => {
  return axios.put(`${API}/product/star/${productId}`, { star }, {
    headers: {
      authtoken
    }
  })
}

export const getRelated = async (productId) => {
  return await axios.get(`${API}/product/related/${productId}`);
}

export const fetchProductsByFilter = async (arg) => {
  return await axios.post(`${API}/search/filters`, arg)
}