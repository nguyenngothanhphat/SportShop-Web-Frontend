import axios from "axios";
import {API} from '../../config'

export const getBrands = async () =>
  await axios.get(`${API}/brands`);

export const getBrand = async (slug) =>
  await axios.get(`${API}/brand/${slug}`);

export const removeBrand = async (slug, authtoken) =>
  await axios.delete(`${API}/brand/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateBrand = async (slug, brand, authtoken) =>
  await axios.put(`${API}/brand/${slug}`, brand, {
    headers: {
      authtoken,
    },
  });

export const createBrand = async (brand, authtoken) =>
  await axios.post(`${API}/brand`, brand, {
    headers: {
      authtoken,
    },
  });
