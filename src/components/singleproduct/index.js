import React, { useState } from "react";
import styled from "styled-components";

import Header from "../header/index";
import Footer from "../footer/index";

import StarRating from "./star";

const Tab = styled.button`
  font-size: 12px;
  font-weight: bold;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
        active &&
        `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const types = ["DESCRIPTION", "ADDITIONAL INFORMATION", "EVALUATE"];

const SingleProduct = ({ totalStars }) => {

    const [active, setActive] = useState("DESCRIPTION");
    return (
        <div>
            <Header />
            <div className="single">
                <div className="container">
                    <div className="single-top-main">
                        <div className="col-md-5 single-top">
                            <div className="single-w3agile">
                                <div
                                    id="picture-frame"
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        cursor: "crosshair",
                                    }}
                                >
                                    <img
                                        src="images/myp-impact-whey-isolate.png"
                                        data-src="images/myp-impact-whey-isolate.png"
                                        alt="si"
                                        className="img-responsive"
                                    />
                                    <img
                                        src="images/myp-impact-whey-isolate.png"
                                        alt="si"
                                        style={{
                                            position: "absolute",
                                            top: "-12px",
                                            left: 0,
                                            opacity: 0,
                                            width: 700,
                                            height: 700,
                                            border: "none",
                                            maxWidth: "none",
                                            maxHeight: "none",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 single-top-left">
                            <div className="single-right">
                                <h3>MyProtein Impact Whey Isolate</h3>
                                <div className="pr-single">
                                    <p className="reduced ">
                                        <del>$10.00</del>$5.00
                  </p>
                                </div>
                                <div className="block block-w3">
                                    <div className="starbox small ghosting">
                                        <div className="positioner">
                                            <StarRating totalStars={5} />
                                        </div>
                                    </div>
                                </div>
                                <p className="in-pa">
                                    {" "}
                  Là loại bột whey protein chất lượng cao đến từ nhà sản xuất
                  Myprotein (Anh) do Nutrition Depot VN nhập khẩu và phân phối
                  chính hãng.
                </p>
                                <ul className="social-top">
                                    <li>
                                        <a href="/" className="icon facebook">
                                            <i className="fa fa-facebook" aria-hidden="true" />
                                            <span />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="icon twitter">
                                            <i className="fa fa-twitter" aria-hidden="true" />
                                            <span />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="icon pinterest">
                                            <i className="fa fa-pinterest-p" aria-hidden="true" />
                                            <span />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="icon dribbble">
                                            <i className="fa fa-dribbble" aria-hidden="true" />
                                            <span />
                                        </a>
                                    </li>
                                </ul>
                                <div className="add add-3">
                                    <button
                                        className="btn btn-danger my-cart-btn my-cart-b"
                                        data-id={1}
                                        data-name="Wheat"
                                        data-summary="summary 1"
                                        data-price={6.0}
                                        data-quantity={1}
                                        data-image="images/si.jpg"
                                    >
                                        Add to Cart
                  </button>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div>
                        <div className="col-md-12">
                            <ButtonGroup>
                                {types.map((type) => (
                                    <Tab
                                        key={type}
                                        active={active === type}
                                        onClick={() => setActive(type)}
                                    >
                                        {type}
                                    </Tab>
                                ))}
                            </ButtonGroup>
                            <p />
                            <>
                                {active === "DESCRIPTION" ? (
                                    <div>
                                        <h3>Tổng quan về sản phẩm</h3>
                                        <p>1 muỗng Whey Protein Isolate cung cấp 23g Protein, cung cấp nguồn protein chất lượng cao, giúp bạn đạt được mục tiêu tập luyện của mình tốt hơn.</p>
                                        <h3>Whey Protein Isolate là gì?</h3>
                                        <p>Whey Protein Isolate (đạm protein cô lập) là một dạng protein từ sữa với độ tinh khiết cao, ít đường và ít béo.</p>
                                        <h3>Lợi ích chính</h3>
                                        <ul>
                                            <li>Chứa khoảng 90% protein mỗi serving (muỗng)</li>
                                            <li>Cung cấp 23g protein cho mỗi serving 25g</li>
                                        </ul>
                                    </div>
                                ) : active === "ADDITIONAL INFORMATION" ? (
                                    <table className="table table-striped">
                                        <tr>
                                            <th>Trọng lượng</th>
                                            <td>5kg</td>
                                        </tr>
                                        <tr>
                                            <th>Hương vị</th>
                                            <td>
                                                <p>
                                                    <a href="#">Banana</a>,
                            <a href="#">Blueberry</a>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                ) : active === "EVALUATE" ? (
                                    <h1>KKK</h1>
                                ) : (
                                                <h1>Error</h1>
                                            )}
                            </>
                        </div>
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
                            <span>
                                <i />
                            </span>
                            <b className="line" />
                        </div>
                    </div>
                    <div className=" con-w3l wthree-of">
                        <div className="col-md-3 pro-1">
                            <div className="col-m">
                                <a
                                    href="/"
                                    data-toggle="modal"
                                    data-target="#myModal5"
                                    className="offer-img"
                                >
                                    <img
                                        src="images/clear-orange-mango.png"
                                        className="img-responsive"
                                        alt="ofpic"
                                    />
                                    <div className="offer">
                                        <p>
                                            <span>Offer</span>
                                        </p>
                                    </div>
                                </a>
                                <div class="mid-1">
                                    <div className="women">
                                        <h6>
                                            <a href="/">Lays</a>(100 g)
                    </h6>
                                    </div>
                                    <div className="mid-2">
                                        <p>
                                            <label>$1.00</label>
                                            <em className="item_price">$0.70</em>
                                        </p>
                                        <div className="block">
                                            <div className="starbox small ghosting"></div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="add">
                                        <button
                                            className="btn btn-danger my-cart-btn my-cart-b"
                                            data-id={5}
                                            data-name="Lays"
                                            data-summary="summary 5"
                                            data-price="0.70"
                                            data-quantity={1}
                                            data-image="images/of4.png"
                                        >
                                            Add to Cart
                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 pro-1">
                            <div className="col-m">
                                <a
                                    href="/"
                                    data-toggle="modal"
                                    data-target="#myModal5"
                                    className="offer-img"
                                >
                                    <img
                                        src="images/clear-orange-mango.png"
                                        className="img-responsive"
                                        alt="ofpic"
                                    />
                                    <div className="offer">
                                        <p>
                                            <span>Offer</span>
                                        </p>
                                    </div>
                                </a>
                                <div class="mid-1">
                                    <div className="women">
                                        <h6>
                                            <a href="/">Lays</a>(100 g)
                    </h6>
                                    </div>
                                    <div className="mid-2">
                                        <p>
                                            <label>$1.00</label>
                                            <em className="item_price">$0.70</em>
                                        </p>
                                        <div className="block">
                                            <div className="starbox small ghosting"></div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="add">
                                        <button
                                            className="btn btn-danger my-cart-btn my-cart-b"
                                            data-id={5}
                                            data-name="Lays"
                                            data-summary="summary 5"
                                            data-price="0.70"
                                            data-quantity={1}
                                            data-image="images/of4.png"
                                        >
                                            Add to Cart
                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 pro-1">
                            <div className="col-m">
                                <a
                                    href="/"
                                    data-toggle="modal"
                                    data-target="#myModal5"
                                    className="offer-img"
                                >
                                    <img
                                        src="images/clear-orange-mango.png"
                                        className="img-responsive"
                                        alt="ofpic"
                                    />
                                    <div className="offer">
                                        <p>
                                            <span>Offer</span>
                                        </p>
                                    </div>
                                </a>
                                <div class="mid-1">
                                    <div className="women">
                                        <h6>
                                            <a href="/">Lays</a>(100 g)
                    </h6>
                                    </div>
                                    <div className="mid-2">
                                        <p>
                                            <label>$1.00</label>
                                            <em className="item_price">$0.70</em>
                                        </p>
                                        <div className="block">
                                            <div className="starbox small ghosting"></div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="add">
                                        <button
                                            className="btn btn-danger my-cart-btn my-cart-b"
                                            data-id={5}
                                            data-name="Lays"
                                            data-summary="summary 5"
                                            data-price="0.70"
                                            data-quantity={1}
                                            data-image="images/of4.png"
                                        >
                                            Add to Cart
                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 pro-1">
                            <div className="col-m">
                                <a
                                    href="/"
                                    data-toggle="modal"
                                    data-target="#myModal5"
                                    className="offer-img"
                                >
                                    <img
                                        src="images/clear-orange-mango.png"
                                        className="img-responsive"
                                        alt="ofpic"
                                    />
                                    <div className="offer">
                                        <p>
                                            <span>Offer</span>
                                        </p>
                                    </div>
                                </a>
                                <div class="mid-1">
                                    <div className="women">
                                        <h6>
                                            <a href="/">Lays</a>(100 g)
                    </h6>
                                    </div>
                                    <div className="mid-2">
                                        <p>
                                            <label>$1.00</label>
                                            <em className="item_price">$0.70</em>
                                        </p>
                                        <div className="block">
                                            <div className="starbox small ghosting"></div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="add">
                                        <button
                                            className="btn btn-danger my-cart-btn my-cart-b"
                                            data-id={5}
                                            data-name="Lays"
                                            data-summary="summary 5"
                                            data-price="0.70"
                                            data-quantity={1}
                                            data-image="images/of4.png"
                                        >
                                            Add to Cart
                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 pro-1">
                            <div className="col-m">
                                <a
                                    href="/"
                                    data-toggle="modal"
                                    data-target="#myModal5"
                                    className="offer-img"
                                >
                                    <img
                                        src="images/clear-orange-mango.png"
                                        className="img-responsive"
                                        alt="ofpic"
                                    />
                                    <div className="offer">
                                        <p>
                                            <span>Offer</span>
                                        </p>
                                    </div>
                                </a>
                                <div class="mid-1">
                                    <div className="women">
                                        <h6>
                                            <a href="/">Lays</a>(100 g)
                    </h6>
                                    </div>
                                    <div className="mid-2">
                                        <p>
                                            <label>$1.00</label>
                                            <em className="item_price">$0.70</em>
                                        </p>
                                        <div className="block">
                                            <div className="starbox small ghosting"></div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="add">
                                        <button
                                            className="btn btn-danger my-cart-btn my-cart-b"
                                            data-id={5}
                                            data-name="Lays"
                                            data-summary="summary 5"
                                            data-price="0.70"
                                            data-quantity={1}
                                            data-image="images/of4.png"
                                        >
                                            Add to Cart
                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 pro-1">
                            <div className="col-m">
                                <a
                                    href="/"
                                    data-toggle="modal"
                                    data-target="#myModal5"
                                    className="offer-img"
                                >
                                    <img
                                        src="images/clear-orange-mango.png"
                                        className="img-responsive"
                                        alt="ofpic"
                                    />
                                    <div className="offer">
                                        <p>
                                            <span>Offer</span>
                                        </p>
                                    </div>
                                </a>
                                <div class="mid-1">
                                    <div className="women">
                                        <h6>
                                            <a href="/">Lays</a>(100 g)
                    </h6>
                                    </div>
                                    <div className="mid-2">
                                        <p>
                                            <label>$1.00</label>
                                            <em className="item_price">$0.70</em>
                                        </p>
                                        <div className="block">
                                            <div className="starbox small ghosting"></div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="add">
                                        <button
                                            className="btn btn-danger my-cart-btn my-cart-b"
                                            data-id={5}
                                            data-name="Lays"
                                            data-summary="summary 5"
                                            data-price="0.70"
                                            data-quantity={1}
                                            data-image="images/of4.png"
                                        >
                                            Add to Cart
                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 pro-1">
                            <div className="col-m">
                                <a
                                    href="/"
                                    data-toggle="modal"
                                    data-target="#myModal5"
                                    className="offer-img"
                                >
                                    <img
                                        src="images/clear-orange-mango.png"
                                        className="img-responsive"
                                        alt="ofpic"
                                    />
                                    <div className="offer">
                                        <p>
                                            <span>Offer</span>
                                        </p>
                                    </div>
                                </a>
                                <div class="mid-1">
                                    <div className="women">
                                        <h6>
                                            <a href="/">Lays</a>(100 g)
                    </h6>
                                    </div>
                                    <div className="mid-2">
                                        <p>
                                            <label>$1.00</label>
                                            <em className="item_price">$0.70</em>
                                        </p>
                                        <div className="block">
                                            <div className="starbox small ghosting"></div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="add">
                                        <button
                                            className="btn btn-danger my-cart-btn my-cart-b"
                                            data-id={5}
                                            data-name="Lays"
                                            data-summary="summary 5"
                                            data-price="0.70"
                                            data-quantity={1}
                                            data-image="images/of4.png"
                                        >
                                            Add to Cart
                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 pro-1">
                            <div className="col-m">
                                <a
                                    href="/"
                                    data-toggle="modal"
                                    data-target="#myModal5"
                                    className="offer-img"
                                >
                                    <img
                                        src="images/clear-orange-mango.png"
                                        className="img-responsive"
                                        alt="ofpic"
                                    />
                                    <div className="offer">
                                        <p>
                                            <span>Offer</span>
                                        </p>
                                    </div>
                                </a>
                                <div class="mid-1">
                                    <div className="women">
                                        <h6>
                                            <a href="/">Lays</a>(100 g)
                    </h6>
                                    </div>
                                    <div className="mid-2">
                                        <p>
                                            <label>$1.00</label>
                                            <em className="item_price">$0.70</em>
                                        </p>
                                        <div className="block">
                                            <div className="starbox small ghosting"></div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="add">
                                        <button
                                            className="btn btn-danger my-cart-btn my-cart-b"
                                            data-id={5}
                                            data-name="Lays"
                                            data-summary="summary 5"
                                            data-price="0.70"
                                            data-quantity={1}
                                            data-image="images/of4.png"
                                        >
                                            Add to Cart
                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 pro-1">
                            <div className="col-m">
                                <a
                                    href="/"
                                    data-toggle="modal"
                                    data-target="#myModal5"
                                    className="offer-img"
                                >
                                    <img
                                        src="images/clear-orange-mango.png"
                                        className="img-responsive"
                                        alt="ofpic"
                                    />
                                    <div className="offer">
                                        <p>
                                            <span>Offer</span>
                                        </p>
                                    </div>
                                </a>
                                <div class="mid-1">
                                    <div className="women">
                                        <h6>
                                            <a href="/">Lays</a>(100 g)
                    </h6>
                                    </div>
                                    <div className="mid-2">
                                        <p>
                                            <label>$1.00</label>
                                            <em className="item_price">$0.70</em>
                                        </p>
                                        <div className="block">
                                            <div className="starbox small ghosting"></div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="add">
                                        <button
                                            className="btn btn-danger my-cart-btn my-cart-b"
                                            data-id={5}
                                            data-name="Lays"
                                            data-summary="summary 5"
                                            data-price="0.70"
                                            data-quantity={1}
                                            data-image="images/of4.png"
                                        >
                                            Add to Cart
                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 pro-1">
                            <div className="col-m">
                                <a
                                    href="/"
                                    data-toggle="modal"
                                    data-target="#myModal5"
                                    className="offer-img"
                                >
                                    <img
                                        src="images/clear-orange-mango.png"
                                        className="img-responsive"
                                        alt="ofpic"
                                    />
                                    <div className="offer">
                                        <p>
                                            <span>Offer</span>
                                        </p>
                                    </div>
                                </a>
                                <div class="mid-1">
                                    <div className="women">
                                        <h6>
                                            <a href="/">Lays</a>(100 g)
                    </h6>
                                    </div>
                                    <div className="mid-2">
                                        <p>
                                            <label>$1.00</label>
                                            <em className="item_price">$0.70</em>
                                        </p>
                                        <div className="block">
                                            <div className="starbox small ghosting"></div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="add">
                                        <button
                                            className="btn btn-danger my-cart-btn my-cart-b"
                                            data-id={5}
                                            data-name="Lays"
                                            data-summary="summary 5"
                                            data-price="0.70"
                                            data-quantity={1}
                                            data-image="images/of4.png"
                                        >
                                            Add to Cart
                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 pro-1">
                            <div className="col-m">
                                <a
                                    href="/"
                                    data-toggle="modal"
                                    data-target="#myModal5"
                                    className="offer-img"
                                >
                                    <img
                                        src="images/clear-orange-mango.png"
                                        className="img-responsive"
                                        alt="ofpic"
                                    />
                                    <div className="offer">
                                        <p>
                                            <span>Offer</span>
                                        </p>
                                    </div>
                                </a>
                                <div class="mid-1">
                                    <div className="women">
                                        <h6>
                                            <a href="/">Lays</a>(100 g)
                    </h6>
                                    </div>
                                    <div className="mid-2">
                                        <p>
                                            <label>$1.00</label>
                                            <em className="item_price">$0.70</em>
                                        </p>
                                        <div className="block">
                                            <div className="starbox small ghosting"></div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="add">
                                        <button
                                            className="btn btn-danger my-cart-btn my-cart-b"
                                            data-id={5}
                                            data-name="Lays"
                                            data-summary="summary 5"
                                            data-price="0.70"
                                            data-quantity={1}
                                            data-image="images/of4.png"
                                        >
                                            Add to Cart
                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 pro-1">
                            <div className="col-m">
                                <a
                                    href="/"
                                    data-toggle="modal"
                                    data-target="#myModal5"
                                    className="offer-img"
                                >
                                    <img
                                        src="images/clear-orange-mango.png"
                                        className="img-responsive"
                                        alt="ofpic"
                                    />
                                    <div className="offer">
                                        <p>
                                            <span>Offer</span>
                                        </p>
                                    </div>
                                </a>
                                <div class="mid-1">
                                    <div className="women">
                                        <h6>
                                            <a href="/">Lays</a>(100 g)
                    </h6>
                                    </div>
                                    <div className="mid-2">
                                        <p>
                                            <label>$1.00</label>
                                            <em className="item_price">$0.70</em>
                                        </p>
                                        <div className="block">
                                            <div className="starbox small ghosting"></div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="add">
                                        <button
                                            className="btn btn-danger my-cart-btn my-cart-b"
                                            data-id={5}
                                            data-name="Lays"
                                            data-summary="summary 5"
                                            data-price="0.70"
                                            data-quantity={1}
                                            data-image="images/of4.png"
                                        >
                                            Add to Cart
                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SingleProduct;
