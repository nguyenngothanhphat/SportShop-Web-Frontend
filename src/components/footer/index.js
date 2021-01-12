import React from 'react';
import { Link } from 'react-router-dom';

const footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="col-md-3 footer-grid">
                    <h3>About Us</h3>
                    <p>TP Store was born to meet the rising demand in Asian countries for certified, high quality, high efficiency and safe sports nutrition food. Currently, Nutrition Depot is present in Australia, New Zealand, India, Pakistan, China, Hong Kong, Thailand, Myanmar, Maylaysia, Indonesia, the Philippines, Brunei, Singapore, Laos, Cambodia and Vietnam.</p>
                </div>
                <div className="col-md-3 footer-grid ">
                    <h3>Menu</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/kitchen">Promotion</Link></li>
                        <li><Link to="/care">Brand</Link></li>
                        <li><Link to="/house-hold">Product</Link></li>
                        <li><Link to="/house-hold">Accessories</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="col-md-3 footer-grid ">
                    <h3>Customer Services</h3>
                    <ul>
                        <li><Link to="/desclaimer">Disclaimer</Link></li>
                        <li><Link to="/faq">Faqs</Link></li>
                        <li><Link to="/privacy-and-policy">Privacy & Policy</Link></li>
                        <li><Link to="/term-and-condition">Terms &amp; Conditions</Link></li>
                    </ul>
                </div>
                <div className="col-md-3 footer-grid">
                    <h3>My Account</h3>
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        {/* <li><Link to="wishlist">Wishlist</Link></li> */}
                    </ul>
                </div>
                <div className="clearfix" />
                <div className="footer-bottom">
                    <h2><Link to="/"><b>T<br />H<br />E</b>Big Store<span>The Food Supplement</span></Link></h2>
                    <p className="fo-para">All products sold by the TP Store are not medicines, and have no effect to replace medicines.
The effectiveness when using the product depends on the location and diet, activity and exercise of each person.</p>
                    <ul className="social-fo">
                        <li><Link to="#" className=" face"><i className="fa fa-facebook" aria-hidden="true" /></Link></li>
                        <li><Link to="#" className=" twi"><i className="fa fa-twitter" aria-hidden="true" /></Link></li>
                        <li><Link to="#" className=" pin"><i className="fa fa-pinterest-p" aria-hidden="true" /></Link></li>
                        <li><Link to="#" className=" dri"><i className="fa fa-dribbble" aria-hidden="true" /></Link></li>
                    </ul>
                    <div className=" address">
                        <div className="col-md-4 fo-grid1">
                            <p><i className="fa fa-home" aria-hidden="true" />New Delhi , Saket, India.</p>
                        </div>
                        <div className="col-md-4 fo-grid1">
                            <p><i className="fa fa-phone" aria-hidden="true" />+91 8375893352</p>
                        </div>
                        <div className="col-md-4 fo-grid1">
                            <p><Link to="/gmail.com"><i className="fa fa-envelope-o" aria-hidden="true" />pandit.bechu@gmail.com</Link></p>
                        </div>
                        <div className="clearfix" />
                    </div>
                </div>
                <div className="copy-right">
                    <p> © 2020 Big store. All Rights Reserved | Design by  <Link to="http://abhinashkumar.com/"> Thanh Phat</Link></p>
                </div>
            </div>
        </div>
    )
}

export default footer;