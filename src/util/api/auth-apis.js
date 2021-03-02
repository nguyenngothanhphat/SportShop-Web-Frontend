import React from "react";
import { API } from "../../config";

export const register = (user) => {
  return fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      console.log("🚀 ~ file: register.js ~ line 33 ~ .then ~ res", res);
      return res.json();
    })
    .catch((err) => {
      console.log("🚀 ~ file: register.js ~ line 36 ~ login ~ err", err);
    });
};

export const login = (user) => {
  return fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      console.log("🚀 ~ file: auth-apis.js ~ line 33 ~ login ~ res", res);
      return res.json();
    })
    .catch((err) => {
      console.log("🚀 ~ file: auth-apis.js ~ line 36 ~ login ~ err", err);
    });
};

export const logout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/auth/logout`, {
      method: "GET"
    })
    .then(res => {
      console.log("logout", res)
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export const authenticate = (data, next) => { 
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
}

export const isAuthenticate = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
}
