import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useCategory from "../custom/useCategoryHook";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const categories = useCategory();

  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/products`);
      setLoading(false);
      setProducts(res.data.products);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <h2 className="text-center">Categories</h2>
        <div className="categories">
          {/* {products?.map((prod) => ( */}
          <Link to={`/products`} key="products" className="badge category">
            All
          </Link>
          {/* ))} */}

          {categories?.map((cat) => (
            <Link
              to={`/category/${cat.category_slug}`}
              key={cat.category_id}
              className="badge category"
            >
              {cat.category_name}
            </Link>
          ))}
        </div>
        <div className="container-fluid mt-3">
          <h2 className="text-center">All Products</h2>
          <div className="products d-flex flex-wrap m-0">
            {products?.map((prod) => (
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

                  <button
                    onClick={() => navigate(`/product/${prod.product_slug}`)}
                    className="my-btn"
                  >
                    More Details
                  </button>
                  <button className="my-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
