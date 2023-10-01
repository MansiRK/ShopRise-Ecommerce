import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "./AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`/products`);
      setProducts(res.data.products);
      // console.log(res.data.products);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong infetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2 className="text-center">All Products</h2>
            <div className="m-3 d-flex flex-wrap m-0">
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
                    <p className="card-text">{prod.product_description}</p>
                    <Link
                      to={`/admin/update-product/${prod.product_slug}`}
                      className="my-btn "
                      style={{ textDecoration: "none" }}
                    >
                      Update Product
                    </Link>
                    <button
                      onClick={() => navigate(`/product/${prod.product_slug}`)}
                      className="my-btn"
                    >
                      Product Details
                    </button>
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

export default AllProducts;
