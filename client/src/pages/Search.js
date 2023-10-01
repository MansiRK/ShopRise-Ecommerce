import React from "react";
import Layout from "../components/Layout";
import { useSearch } from "../context/searchContext";
import { Link } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h3>
            {values?.count < 1
              ? "No products found"
              : `Found Items: ${values?.count}`}
          </h3>
          <div className="d-flex flex-wrap mt-4">
            {values?.products ? (
              values.products.map((prod) => (
                // console.log(prod.product_id);
                // console.log(process.env.REACT_APP_API)
                <div
                  className="card"
                  key={prod.product_id}
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`/product-image/${prod.product_id}`}
                    className="card-img-top"
                    alt={prod.product_name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{prod.product_name}</h5>
                    <p className="card-text">
                      {prod.product_description.substring(0, 30)}
                    </p>
                    <p className="card-text">Rs.{prod.product_price}</p>
                    <p className="card-text">
                      Quantity : {prod.product_quantity}
                    </p>

                    <Link to="/" className="btn btn-primary">
                      Go somewhere
                    </Link>
                    <button className="btn btn-dark">Add to cart</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
