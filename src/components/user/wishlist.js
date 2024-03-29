import React, { useState, useEffect } from "react";
import Navigation from "../../components/nav/navigation";
import Header from "../nav/header";
import { getWishlist, removeWishlist } from "../../util/api/user-apis";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    getWishlist(user.token).then((res) => {
      // console.log(res);
      setWishlist(res.data.wishlist);
    });
  };

  const handleRemove = (productId) => {
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Navigation />
          </div>
          <div className="col">
            <h4>Wishlist</h4>
            {wishlist.map((product, i) => {
              return (
                <div key={i} className="alert alert-secondary">
                  <Link to={`/product/${product.slug}`}>{product.title}</Link>
                  <span
                    onClick={() => handleRemove(product._id)}
                    className="btn btn-sm float-right"
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
