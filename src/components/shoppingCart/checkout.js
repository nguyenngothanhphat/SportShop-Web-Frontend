import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import AppHeader from "../nav/header";

import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../../util/api/user-apis";

import "antd/dist/antd.css";
import "react-quill/dist/quill.snow.css";

const { Header, Content, Footer } = Layout;

const CheckOut = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon1, setCoupon] = useState("");

  /* Discount price */
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD, coupon } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("address saved");
      }
    });
  };

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    /* Remove from redux */
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    /* Remove from backend */
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send  coupon1 to backend", coupon1);
    applyCoupon(user.token, coupon1).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux  coupon1 applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux  coupon1 applied

        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => {
    return (
      <>
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
      </>
    );
  };

  const showProductSummary = () => {
    return products.map((product, index) => {
      return (
        <div key={index}>
          <p>
            {product.product.title} ({product.color}) x {product.count} = $
            {product.product.price * product.count}
          </p>
        </div>
      );
    });
  };

  const showApplyCoupon = () => {
    return (
      <>
        <input
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError("");
          }}
          type="text"
          className="form-control"
          value={coupon1}
        />
        <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
          Apply
        </button>
      </>
    );
  };

  const createCashOrder = () => {
    createCashOrderForUser(user.token).then((res) => {
      console.log("User cash order created res", res);
    });
  };

  return (
    <>
      <AppHeader />
      <div className="row padding">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <br />
          <br />
          {showAddress()}
          <hr />
          <h4>Got Coupon?</h4>
          <br />
          {showApplyCoupon()}
          <br />
          {discountError && <p className="bg-danger p-2">{discountError}</p>}
        </div>

        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products {products.length}</p>
          <hr />
          {showProductSummary()}
          <hr />
          <p>Cart Total: ${total}</p>
          {totalAfterDiscount > 0 && (
            <p className="bg-success p-2">
              Discount Applied: Total Payable: ${totalAfterDiscount}
            </p>
          )}
          <div className="row">
            <div className="col-md-6">
              {COD ? (
                <button
                  className="btn btn-primary"
                  disabled={!addressSaved || !products.length}
                  onClick={createCashOrder}
                >
                  Place Order
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  disabled={!addressSaved || !products.length}
                  onClick={() => history.push("/payment")}
                >
                  Place Order
                </button>
              )}
            </div>

            <div className="col-md-6">
              <button
                disabled={!products.length}
                onClick={emptyCart}
                className="btn btn-primary"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
