import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalImage from "react-modal-image";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Header from "../nav/header";
import { userCart } from "../../util/api/user-apis";

const Cart = ({ history }) => {
  const colors = [
    "Chocolate",
    "Chocolate Coconut",
    "Vanilla Espresso",
    "Mojito",
    "Orange mango",
    "Peach Tea",
    "Banana",
    "Blueberry",
    "Chocolate mint",
    "Milk Tea",
    "White Chocolate",
    "Chocolate Mint",
    "Chocolate Smooth",
  ];
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log("🚀 ~ file: cart.js ~ line 24 ~ saveOrderToDb ~ res", res);
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: cart.js ~ line 30 ~ saveOrderToDb ~ err", err);
      });
  };

  const saveCashOrderToDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("🚀 ~ file: cart.js ~ line 24 ~ saveOrderToDb ~ res", res);
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: cart.js ~ line 30 ~ saveOrderToDb ~ err", err);
      });
  };

  const handleSmellChange = (id) => (event) => {
    console.log("🚀 ~ file: cart.js ~ line 25 ~ handleSmellChange ~ id", id);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, index) => {
        if (product._id === id) {
          cart[index].color = event.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (id, quantity) => (event) => {
    let count = event.target.value < 1 ? 1 : event.target.value;
    let cart = [];

    if (count > quantity) {
      toast.error(`Max available quantity: ${quantity}`, {position: "top-center"});
      return;
    }

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, index) => {
        if (product._id === id) {
          cart[index].count = event.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = (id) => {
    // console.log(id);
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, index) => {
        if (product._id === id) {
          cart.splice(index, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const showCartItems = () => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Smell</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        {cart.map((product, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>
                  <div style={{ width: "100px", height: "auto" }}>
                    {product.images ? (
                      <ModalImage
                        small={product.images[0].url}
                        large={product.images[0].url}
                      />
                    ) : (
                      "No image"
                    )}
                  </div>
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  <select
                    onChange={handleSmellChange(product._id)}
                    name="color"
                    className="form-control"
                  >
                    {product.color ? (
                      <option value={product.color}>{product.color}</option>
                    ) : (
                      <option>Select</option>
                    )}
                    {colors
                      .filter((c) => c !== product.color)
                      .map((c) => {
                        return (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        );
                      })}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={product.count}
                    onChange={handleQuantityChange(
                      product._id,
                      product.quantity
                    )}
                  />
                </td>
                <td className="text-center">
                  {product.shipping === "Yes" ? (
                    <CheckCircleOutlined className="text-success" />
                  ) : (
                    <CloseCircleOutlined className="text-danger" />
                  )}
                </td>
                <td className="text-center">
                  <CloseOutlined
                    onClick={() => handleRemove(product._id)}
                    className="text-danger pointer"
                  />
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  };

  return (
    <>
      <Header />
      <div className="container-fluid pt-2">
        <div className="row">
          <div className="col-md-8">
            <h4>Cart / {cart.length} Product</h4>
            {!cart.length ? (
              <p>
                No products in cart:{" "}
                <Link to="/filter/product">Continue Shopping</Link>
              </p>
            ) : (
              showCartItems()
            )}
          </div>
          <div className="col-md-4">
            <h4>Order Summary</h4>
            <hr />
            {cart.map((c, index) => {
              return (
                <div key={index}>
                  <p>
                    {c.title} x {c.count} = ${c.price * c.count}
                  </p>
                </div>
              );
            })}
            <hr />
            Total: <b>${getTotal()}</b>
            <hr />
            {user ? (
              <>
                <button
                  onClick={saveOrderToDb}
                  disabled={!cart.length}
                  className="btn btn-sm btn-primary mt-2"
                >
                  Proceed to Checkout
                </button>
                <br />
                <button
                  onClick={saveCashOrderToDb}
                  className="btn btn-sm btn-warning mt-2"
                  disabled={!cart.length}
                >
                  Pay Cash on Delivery
                </button>
              </>
            ) : (
              <button className="btn btn-sm btn-primary mt-2">
                <Link
                  to={{
                    pathname: "/login",
                    state: { from: "cart" },
                  }}
                >
                  Login to Checkout
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
