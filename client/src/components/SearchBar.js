import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/searchContext";
import { LiaSearchSolid } from "react-icons/lia";

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
      alert("No product found for this search");
    }
  };
  return (
    <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
      <div className="row w-100">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-9 col-9 d-flex align-items-center justify-content-lg-end justify-content-center">
              <div className="search-bar">
                <LiaSearchSolid />
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
              </div>
            </div>
            <div className="col-lg-3 col-3 d-flex align-items-center justify-content-start ps-0">
              <button className="btn btn-dark search-btn" type="submit">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
