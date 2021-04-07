import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (event) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: event.target.value },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    // <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
    //     <input type="search" onChange={handleChange} value={text} className="form-control mr-sm-2" placeholder="Search product" />
    //     <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    // </form>

    <form onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="Search product"
        style={{
          borderRadius: "40px 0px 0px 40px",
          width: "435px",
        }}
        name="search"
        onChange={handleChange}
        value={text}
      />
      <button className="search-btn">Search</button>
    </form>
  );
};

export default Search;
