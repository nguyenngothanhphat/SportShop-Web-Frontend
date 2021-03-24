import React from "react";
import { Card, Skeleton } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import StarRating from 'react-star-ratings';

import ShowAverageRating from '../product/showAverageRating';

const { Meta } = Card;

const CardProduct = ({ product }) => {
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
          <>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
        </>,
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
