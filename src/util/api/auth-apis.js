import React from "react";
import { API } from "../../config";

export const register = (user) => {
  // console.log(user);
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
