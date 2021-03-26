import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../nav/header'

const Cart = () => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    return (
        <>
            <Header />
            <div className="container-fluid pt-2">
                <div className="row">
                    <div className="col-md-8">
                        <h4>Cart / {cart.length} Product</h4>
                        {!cart.length ? (
                            <p>
                                No products in cart: <Link to="/filter/product">Continue Shopping</Link>
                            </p>
                        ) : (
                            "Show cart items"
                        )}
                    </div>
                    <div className="col-md-4">
                        <h4>Order Summary</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;