import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  getProduct,
  getProductsCount,
  productStar,
  getRelated,
} from "../../util/api/product-apis";
import { addWishlist } from "../../util/api/user-apis";
import StarRating from "react-star-ratings";
import _ from "lodash";
import RatingModal from "../modal/rating";
import ShowAverageRating from "./showAverageRating";
import CardProduct from "../card/cardProduct";
import AppHeader from "../nav/header";
import CartModal from "../modal/cartModal";
import "antd/dist/antd.css";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const DetailProduct = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const [tooltip, setTooltip] = useState("Click to add");

  const dispatch = useDispatch();

  /* Router */
  let history = useHistory();

  const {
    _id,
    title,
    description,
    images,
    category,
    price,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
    ratings,
  } = product;

  const { slug } = match.params;

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let exsitingRatingObject = product.ratings.find(
        (el) => el.postedBy.toString() === user._id.toString()
      );
      exsitingRatingObject && setStar(exsitingRatingObject.star);
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);

      /* Load related */
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token).then((res) => {
      console.log(
        "🚀 ~ file: detail.js ~ line 36 ~ productStar ~ res",
        res.data
      );
      loadSingleProduct();
    });
  };

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      /* if cart is in localstorage GET it */
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      /* push new product to cart */
      cart.push({
        ...product,
        count: 1,
      });

      /* Remove duplicates */
      let unique = _.uniqWith(cart, _.isEqual);
      /* Save to local storage */
      localStorage.setItem("cart", JSON.stringify(unique));
      /* Show tooltip */
      setTooltip("Added");

      /* Add to redux state */
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      /* Show cart items in side modal */
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addWishlist(product._id, user.token).then((res) => {
      console.log("Add to wishlist", res.data);
      toast.success("Added to Wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <AppHeader />
      <div>
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-md-push-2">
                <div>
                  <div>
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                      {images &&
                        images.map((image) => {
                          return <img src={image.url} key={image.public_id} />;
                        })}
                    </Carousel>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="product-detail">
                  <h2 className="product-name">{title}</h2>
                  <div>
                    {product &&
                    product.ratings &&
                    product.ratings.length > 0 ? (
                      ShowAverageRating(product)
                    ) : (
                      <div className="text-center pt-1 pb-3">No rating yet</div>
                    )}
                  </div>
                  <div>
                    <h3 className="product-price">${price} </h3>
                  </div>
                  <p>{description}</p>
                  <ul className="product-btns">
                    <li>
                      <button className="btn btn-primary">
                        <a onClick={handleAddToWishlist}>
                          <i className="fa fa-heart-o"></i> Add to Wishlist
                        </a>
                      </button>
                    </li>
                    <li>
                      <Link>
                        <RatingModal>
                          <StarRating
                            name={_id}
                            numberOfStars={5}
                            rating={star}
                            changeRating={onStarClick}
                            isSelectable={true}
                            starRatedColor="blue"
                            starHoverColor="blue"
                            starDimension="40px"
                            starSpacing="15px"
                          />
                        </RatingModal>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div>
                  <Tabs type="card">
                    <TabPane tab="Description" key="1">
                      {description && description}
                    </TabPane>
                    <TabPane tab="Additional Information" key="2">
                      <table className="table table-striped">
                        <tbody>
                          <tr>
                            <th>Flavour</th>
                            <td>
                              <p>{color}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </TabPane>
                    <TabPane tab="Reviews" key="3">
                      Call use on xxxx xxx xxx to learn more about this product
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title text-center">
                  <h3 className="title">Related Products</h3>
                </div>
              </div>
              <div className="row pb-5">
                {related.length > 0 ? (
                  related.map((relate, index) => {
                    return (
                      <div key={index} className="col-md-4">
                        <CardProduct product={relate} />
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center col">No Products Found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
