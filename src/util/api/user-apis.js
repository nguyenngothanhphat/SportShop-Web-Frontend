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

export const createCashOrderForUser = async (authtoken, COD, couponTrueOrFalse) => {
  return await axios.post(
    `${API}/user/cash-order`,
    { couponApplied: couponTrueOrFalse, COD },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUsers = async () => {
  return await axios.get(`${API}/users`);
}

export const getUser = async (_id) => {
  return await axios.get(`${API}/user/${_id}`);
}

export const updateUser = async (userId, user, authtoken) => {
console.log("🚀 ~ file: user-apis.js ~ line 129 ~ updateUser ~ authtoken", authtoken)
console.log("🚀 ~ file: user-apis.js ~ line 129 ~ updateUser ~ user", user)
  return await axios.put(`${API}/user/${userId}`, user, {
    headers: {
      authtoken,
    }
  })
}

export const removeUser = async (userId, authtoken) => {
  return await axios.delete(`${API}/user/${userId}`, {
    headers: {
      authtoken,
    }
  })
}
