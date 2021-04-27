import React, { useState, useEffect } from "react";
import { getCategory } from "../../util/api/category-apis";
import CardProduct from "../card/cardProduct";
import Header from '../nav/header';
import Footer from '../nav/footer';

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((c) => {
      setCategory(c.data.category);
      setProducts(c.data.products);
      setLoading(false);
    });
  }, [slug]);

  return (
      <>
      <Header />
      <div className="container">
          <div className="row">
            <div className="col">
                {loading ? (
                    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                        Loading ...
                    </h4>
                ) : (
                    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                        {products.length} Products in {category.name} category
                    </h4>
                )}
            </div>
          </div>
          <div className="row">
                {products.map((product, index) => {
                    return (
                        <div className="col-md-4" key={index}>
                            <CardProduct product={product} />
                        </div>
                    )
                })}
          </div>
      </div>
      <Footer />
      </>
  )
};

export default CategoryHome;
