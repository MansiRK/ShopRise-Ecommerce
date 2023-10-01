import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/searchContext";

const SearchBar = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(`product/search/${values.keyword}`);
      setValues({
        ...values,
        count: data.count,
        products: data.products,
      });
      navigate("/search");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="search">
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="search-input"
          type="search"
          placeholder="Search products here ..."
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => {
            setValues({
              ...values,
              keyword: e.target.value,
            });
          }}
        />
        <button className="btn btn-dark" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
