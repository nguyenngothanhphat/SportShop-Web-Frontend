import axios from "axios";
import { API } from "../../config";

export const userCart = async (cart, authtoken) => {
  return await axios.post(
    `${API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserCart = async (authtoken) => {
  return await axios.get(`${API}/user/cart`, {
    headers: {
      authtoken,
    },
  });
};

export const emptyUserCart = async (authtoken) => {
  return await axios.delete(`${API}/user/cart`, {
    headers: {
      authtoken,
    },
  });
};

export const saveUserAddress = async (authtoken, address) => {
  return await axios.post(
    `${API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const applyCoupon = async (authtoken, coupon) => {
  return await axios.post(
    `${API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createOrder = async (stripeResponse, authtoken) => {
  return await axios.post(
    `${API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserOrders = async (authtoken) => {
  return await axios.get(`${API}/user/orders`, {
    headers: {
      authtoken,
    },
  });
};

export const getWishlist = async (authtoken) => {
  return await axios.get(`${API}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });
};

export const removeWishlist = async (productId, authtoken) => {
  return await axios.put(
    `${API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const addWishlist = async (productId, authtoken) => {
  return await axios.post(
    `${API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCashOrderForUser = async (authtoken) => {
  return await axios.post(
    `${API}/user/cash-order`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
