import React from 'react';

import Header from '../header/index';
import Footer from '../footer/index';

const SingleProduct = () => {
    return (
        <div>
            <Header />
            <div className="single">
                <div className="container">
                    <div className="single-top-main">
                        <div className="col-md-5 single-top">
                            <div className="single-w3agile">
                                <div id="picture-frame" style={{ position: 'relative', overflow: 'hidden', cursor: 'crosshair' }}>
                                    <img src="images/myp-impact-whey-isolate.png" data-src="images/myp-impact-whey-isolate.png" alt="si" className="img-responsive" />
                                    <img src="images/myp-impact-whey-isolate.png" alt="si" style={{ position: 'absolute', top: '-12px', left: 0, opacity: 0, width: 700, height: 700, border: 'none', maxWidth: 'none', maxHeight: 'none' }} /></div>
                            </div>
                        </div>
                        <div className="col-md-7 single-top-left">
                            <div className="single-right">
                                <h3>MyProtein Impact Whey Isolate</h3>
                                <div className="pr-single">
                                    <p className="reduced "><del>$10.00</del>$5.00</p>
                                </div>
                                <div className="block block-w3">
                                    <div className="starbox small ghosting"><div className="positioner"><div className="stars"><div className="ghost" style={{ display: 'none', width: '42.5px' }} /><div className="colorbar" style={{ width: '42.5px' }} /><div className="star_holder"><div className="star star-0" /><div className="star star-1" /><div className="star star-2" /><div className="star star-3" /><div className="star star-4" /></div></div></div></div>
                                </div>
                                <p className="in-pa"> Là loại bột whey protein chất lượng cao đến từ nhà sản xuất Myprotein (Anh) do Nutrition Depot VN nhập khẩu và phân phối chính hãng.</p>
                                <ul className="social-top">
                                    <li><a href="/" className="icon facebook"><i className="fa fa-facebook" aria-hidden="true" /><span /></a></li>
                                    <li><a href="/" className="icon twitter"><i className="fa fa-twitter" aria-hidden="true" /><span /></a></li>
                                    <li><a href="/" className="icon pinterest"><i className="fa fa-pinterest-p" aria-hidden="true" /><span /></a></li>
                                    <li><a href="/" className="icon dribbble"><i className="fa fa-dribbble" aria-hidden="true" /><span /></a></li>
                                </ul>
                                <div className="add add-3">
                                    <button className="btn btn-danger my-cart-btn my-cart-b" data-id={1} data-name="Wheat" data-summary="summary 1" data-price={6.00} data-quantity={1} data-image="images/si.jpg">Add to Cart</button>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
            {/* Similar items */}
            <div className="content-top offer-w3agile">
                <div className="container">
                    <div className="spec">
                        <h3>Special Offers</h3>
                        <div className="ser-t">
                            <b />
                            <span><i /></span>
                            <b className="line" />
                        </div>
                    </div>
                    <div className=" con-w3l wthree-of">
                        <div className="col-md-3 pro-1">
                            <div className="col-m">
                                <a href="/" data-toggle="modal" data-target="#myModal5" className="offer-img">
                                    <img src="images/clear-orange-mango.png" className="img-responsive" alt="ofpic" />
                                    <div className="offer"><p><span>Offer</span></p></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SingleProduct;