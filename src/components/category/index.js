import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../util/api/category-apis";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      // <div
      //   key={c._id}
      //   className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      // >
      //   <Link to={`/category/${c.slug}`}>{c.name}</Link>
      // </div>
      <button key={c._id} type="button" class="btn btn-success btn-lg btn3d m-5"><span class="glyphicon glyphicon-ok"></span><Link to={`/category/${c.slug}`}> {c.name}</Link></button>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
