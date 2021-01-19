import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';

import { logout, isAuthenticate } from '../../util/api/auth-apis';

const header = () => {
    return (
        <div>
            <Grid container className="header_info">
                <Grid item lg={1} xl={2}></Grid>
                <Grid item md={12} lg={11} xl={10} className="header_fixed">
                    <Grid container>
                        <Grid item md={3} lg={2} xl={2}>
                            <div className="logo">
                                <h1><Link to="#"><b>T<br />H<br />E</b>TP Store<span>
                                    food supplement</span></Link></h1>
                            </div>
                        </Grid>
                        <Grid item md={6} lg={7} xl={6}>
                            <div className="search-form">
                                <form action="#" method="post">
                                    <input type="text" name="search" placeholder="Search for Products..." />
                                    <button className="btn search__btn"><i className="fa fa-search" aria-hidden="true"></i></button>
                                </form>
                            </div>
                        </Grid>
                        <Grid item md={3} lg={3} xl={4}>
                            <Grid container className="bk_cart_sd">
                                {!isAuthenticate() && (
                                    <Fragment>
                                        <Grid item md={3} lg={3} xl={3} className="btn_login">
                                            <Link to={"/login"}>
                                                <Button className="login" variant="outlined"><span>Login</span></Button>
                                            </Link>
                                        </Grid>
                                    </Fragment>
                                )}

                                {isAuthenticate() && (
                                    <Grid item md={3} lg={3} xl={3} className="btn_logout">
                                        <Link to={"/"}>
                                            <Button className="logout" onClick={() => {
                                                logout(() => {
                                                    console.log("logout successful")
                                                })
                                            }} variant="outlined"><span>Logout</span></Button>
                                        </Link>
                                    </Grid>
                                )}

                                <Grid item md={3} lg={3} xl={3} className="cart">
                                    <Link to="/carts">
                                        <Button className="cart_item" variant="outlined">
                                            <span className="item_count">1</span>
                                            <i className="fa fa-shopping-cart my-cart-icon" aria-hidden="true" /><span>Cart</span>
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className="header_info_2">
                {/* Nav bar */}
                <Grid item md={1} lg={1} xl={1} className="cart_nav_header"></Grid>
                <Grid item md={11} lg={11} xl={11} className="cart_nav_header">
                    <div className="nav-top">
                        <nav className="navbar navbar-default">
                            <div className="navbar-header nav_2">
                                <button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                            </div>
                            <div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
                                <ul className="nav navbar-nav ">
                                    <li className="active"><Link to="/" className="hyper "><span>Home</span></Link></li>
                                    <li className="dropdown ">
                                        <Link to="/kitchen" className="dropdown-toggle  hyper"><span>Promotion<b className="caret" /></span></Link>
                                        <ul className="dropdown-menu multi">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Water &amp; Beverages</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Fruits &amp; Vegetables</Link></li>
                                                        <li><Link to="/kitchen"> <i className="fa fa-angle-right" aria-hidden="true" />Staples</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Branded Food</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Breakfast &amp; Cereal</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Snacks</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Spices</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Biscuit &amp; Cookie</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Sweets</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Pickle &amp; Condiment</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Instant Food</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Dry Fruit</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Tea &amp; Coffee</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3 w3l">
                                                    <Link to="/kitchen"><img src="images/me.png" className="img-responsive" alt="" /></Link>
                                                </div>
                                                <div className="clearfix" />
                                            </div>
                                        </ul>
                                    </li>

                                    <li className="dropdown ">
                                        <Link to="/kitchen" className="dropdown-toggle  hyper"><span>Brand<b className="caret" /></span></Link>
                                        <ul className="dropdown-menu multi">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Water &amp; Beverages</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Fruits &amp; Vegetables</Link></li>
                                                        <li><Link to="/kitchen"> <i className="fa fa-angle-right" aria-hidden="true" />Staples</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Branded Food</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Breakfast &amp; Cereal</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Snacks</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Spices</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Biscuit &amp; Cookie</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Sweets</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Pickle &amp; Condiment</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Instant Food</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Dry Fruit</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Tea &amp; Coffee</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3 w3l">
                                                    <Link to="/kitchen"><img src="images/me.png" className="img-responsive" alt="" /></Link>
                                                </div>
                                                <div className="clearfix" />
                                            </div>
                                        </ul>
                                    </li>

                                    <li className="dropdown ">
                                        <Link to="/kitchen" className="dropdown-toggle  hyper"><span>Product<b className="caret" /></span></Link>
                                        <ul className="dropdown-menu multi">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Water &amp; Beverages</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Fruits &amp; Vegetables</Link></li>
                                                        <li><Link to="/kitchen"> <i className="fa fa-angle-right" aria-hidden="true" />Staples</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Branded Food</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Breakfast &amp; Cereal</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Snacks</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Spices</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Biscuit &amp; Cookie</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Sweets</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Pickle &amp; Condiment</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Instant Food</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Dry Fruit</Link></li>
                                                        <li><Link to="/kitchen"><i className="fa fa-angle-right" aria-hidden="true" />Tea &amp; Coffee</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3 w3l">
                                                    <Link to="/kitchen"><img src="images/me.png" className="img-responsive" alt="" /></Link>
                                                </div>
                                                <div className="clearfix" />
                                            </div>
                                        </ul>
                                    </li>

                                    <li className="dropdown">
                                        <Link to="#" className="dropdown-toggle hyper" data-toggle="dropdown"><span>Accessories<b className="caret" /></span></Link>
                                        <ul className="dropdown-menu multi multi1">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/care"><i className="fa fa-angle-right" aria-hidden="true" /> Ayurvedic </Link></li>
                                                        <li><Link to="/care"><i className="fa fa-angle-right" aria-hidden="true" />Baby Care</Link></li>
                                                        <li><Link to="/care"><i className="fa fa-angle-right" aria-hidden="true" />Cosmetics</Link></li>
                                                        <li><Link to="/care"><i className="fa fa-angle-right" aria-hidden="true" />Deo &amp; Purfumes</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/care"> <i className="fa fa-angle-right" aria-hidden="true" />Hair Care </Link></li>
                                                        <li><Link to="/care"><i className="fa fa-angle-right" aria-hidden="true" />Oral Care</Link></li>
                                                        <li><Link to="/care"><i className="fa fa-angle-right" aria-hidden="true" />Personal Hygiene</Link></li>
                                                        <li><Link to="/care"><i className="fa fa-angle-right" aria-hidden="true" />Skin care</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/care"><i className="fa fa-angle-right" aria-hidden="true" /> Fashion Accessories </Link></li>
                                                        <li><Link to="/care"><i className="fa fa-angle-right" aria-hidden="true" />Grooming Tools</Link></li>
                                                        <li><Link to="/care"><i className="fa fa-angle-right" aria-hidden="true" />Shaving Need</Link></li>
                                                        <li><Link to="/care"><i className="fa fa-angle-right" aria-hidden="true" />Sanitary Needs</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3 w3l">
                                                    <Link to="/care"><img src="images/me1.png" className="img-responsive" alt="" /></Link>
                                                </div>
                                                <div className="clearfix" />
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <Link to="#" className="dropdown-toggle hyper" data-toggle="dropdown"><span>Blog<b className="caret" /></span></Link>
                                        <ul className="dropdown-menu multi multi2">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Cleaning Accessories</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />CookWear</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Detergents</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Gardening Needs</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Kitchen &amp; Dining</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />KitchenWear</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Pet Care</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Plastic Wear</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Pooja Needs</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Serveware</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Safety Accessories</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Festive Decoratives </Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3 w3l">
                                                    <Link to="/house-hold"><img src="images/me2.png" className="img-responsive" alt="" /></Link>
                                                </div>
                                                <div className="clearfix" />
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <Link to="#" className="dropdown-toggle hyper" data-toggle="dropdown"><span>Contact<b className="caret" /></span></Link>
                                        <ul className="dropdown-menu multi multi2">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Cleaning Accessories</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />CookWear</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Detergents</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Gardening Needs</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Kitchen &amp; Dining</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />KitchenWear</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Pet Care</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Plastic Wear</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3">
                                                    <ul className="multi-column-dropdown">
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Pooja Needs</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Serveware</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Safety Accessories</Link></li>
                                                        <li><Link to="/house-hold"><i className="fa fa-angle-right" aria-hidden="true" />Festive Decoratives </Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-3 w3l">
                                                    <Link to="/house-hold"><img src="images/me2.png" className="img-responsive" alt="" /></Link>
                                                </div>
                                                <div className="clearfix" />
                                            </div>
                                        </ul>
                                    </li>
                                    {/* <li><Link to="/contact" className="hyper"><span>Contact Us</span></Link></li> */}
                                </ul>
                            </div>
                        </nav>
                        <div className="clearfix" />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default header;