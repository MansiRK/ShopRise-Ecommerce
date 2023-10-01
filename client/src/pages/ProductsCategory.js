/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import useCategory from "../custom/useCategoryHook";

const ProductsCategory = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const categories = useCategory();

  useEffect(() => {
    if (params?.slug) {
      getProductsByCategory();
    }
  }, [params?.slug]);

  // useEffect(() => {
  //   console.log(category?.category_name);
  // }, [category]);

  const getProductsByCategory = async () => {
    try {
      const res = await axios.get(`/product-category/${params.slug}`);
      setCategory(res.data?.category);
      // console.log(res.data?.category);
      setProducts(res.data?.products);
      // console.log(res.data.products);
    } catch (error) {
      toast.error("No products found");
      console.error(error);
    }
  };

  // const getAllProducts = async () => {
  //   try {
  //     const res = await axios.get(`products`);
  //     setProducts(res.data.products);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  return (
    <Layout>
      <div className="container m-5">
        {/* {category?.category_name && ( */}
        <Link
          to={`/products`}
          key="products"
          className="badge rounded-pill text-bg-dark"
        >
          All
        </Link>

        {categories?.map((cat) => (
          <Link
            to={`/category/${cat.category_slug}`}
            key={cat.category_id}
            className="badge rounded-pill text-bg-dark"
          >
            {cat.category_name}
          </Link>
        ))}
        <>
          <h3>Category - {category?.category_name}</h3>
          <p className="text-center">{products?.length} results found</p>
        </>
        {/* )} */}

        <div className="row">
          <div className="col-md-9">
            <div className="d-flex">
              {products?.map((prod) => (
                <div className="card" key={prod.product_id}>
                  <img
                    src={`/product-image/${prod.product_id}`}
                    alt={prod.product_name}
                    className="card-img-top"
                  />

                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{prod.product_name}</h5>
                      <h5 className="card-title">
                        {prod.product_price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h5>
                    </div>
                    <p className="card-text">
                      {prod.product_description.substring(0, 400)}...
                    </p>

                    <div className="card-name-price">
                      <button
                        className="btn btn-dark"
                        onClick={() =>
                          navigate(`/product/${prod.product_slug}`)
                        }
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsCategory;
