import React from 'react';
import { Grid, Card } from '@material-ui/core/';
import { Link } from 'react-router-dom';

import Header from '../header/index';
import Footer from '../footer/index';

import "./cart.css"

const Cart = () => {
    return (
        <div>
            <Header />
            <Grid container className="shopping_cart">
                <Grid item md={2} lg={2} xl={2}></Grid>
                <Grid item xs={12} sm={12} md={9} xl={9}>
                    <div className="speci">
                        <h3>Shopping Cart</h3>
                        <div className="ser-t">
                            <b />
                            <span><i /></span>
                            <b className="line" />
                        </div>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th className="t-head head-it ">Products</th>
                                        <th className="t-head">Price</th>
                                        <th className="t-head">Quantity</th>
                                        <th className="t-head">Total</th>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                        <Grid item sx={12} sm={12} md={3} lg={3} xl={3} className="price_details_bk">
                            <Card>
                                <span className="title">Price details</span>
                                <div className="_2twTWD">
                                    <div className="hJYgKM">
                                        <div class="_10vVqD">Price (1 item)</div>
                                        <span> $1.00</span>
                                    </div>
                                    <div class="hJYgKM">
                                        <div class="_10vVqD">Delivery Fee</div>
                                        <span><span class="_27kB8M _3Oa-sk">Free</span></span>
                                    </div>
                                    <div class="_3xFQAD">
                                        <div class="hJYgKM">
                                            <div class="_10vVqD">Total Amount</div>
                                            <span>
                                                <div class="tnAu1u">
                                                    <span > $1.00</span>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="_22vQVX">You will save $210 on this order</div>
                                </div>
                                <Link to="/checkout">
                                    <div className="process_checkout_bk">
                                        <span>Proceed to Checkout</span>
                                    </div>
                                </Link>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}

export default Cart;