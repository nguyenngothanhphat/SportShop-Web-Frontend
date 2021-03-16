import React, { useState, useEffect } from "react";
import Card from "../core/Card/card";
import CheckBox from "../core/checkBox/checkBox";
import RadioBox from '../core/radioBox/radioBox';
import {prices} from '../core/fixedPrices/fixedPrices'

import { getCategories } from "../../util/api/category-apis";

import Header from "../header/index";

const Filter = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const init = () => {
    getCategories().then((data) => {
      console.log(
        "🚀 ~ file: filter.js ~ line 15 ~ getCategories ~ data",
        data
      );
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP: ", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);
   };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <h4>Filter by Categories</h4>
            {/* {categories ? console.log(categories) : null} */}
            <ul>
              <CheckBox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, "category")}
              />
            </ul>

            <h4>Filter by Price Range</h4>
            {/* {categories ? console.log(categories) : null} */}
            <ul>
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </ul>
          </div>
          <div className="col-8">
              {JSON.stringify(myFilters)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
