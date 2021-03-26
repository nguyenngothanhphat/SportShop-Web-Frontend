import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import StarRating from 'react-star-ratings';
import _ from "lodash";
import { useSelector, useDispatch } from 'react-redux';

import ShowAverageRating from '../product/showAverageRating';

const { Meta } = Card;

const CardProduct = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = []
    if (typeof window !== 'undefined') {
      /* if cart is in localstorage GET it */
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"))
      }

      /* push new product to cart */
      cart.push({
        ...product,
        count: 1,
      })

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
      })
    }
  }

  // destructure
  const { images, title, description, slug, price } = product;
  return (
    <>
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : ""}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
        </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
            </a>
          </Tooltip>
        ]}
      >
        {product && product.ratings && product.ratings.length > 0 ? (
          ShowAverageRating(product)
        ) : (
          // <div className="text-center pt-1 pb-3">No rating yet</div>
          <div><StarRating starDimension="20px" starSpacing="2px" editing={false} />{" "} (0)</div>
        )}
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default CardProduct;
