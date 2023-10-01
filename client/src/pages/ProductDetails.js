import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cartContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();

  const getProduct = async () => {
    try {
      const res = await axios.get(`/product/${params.slug}`);
      setProduct(res.data?.product);
      console.log(res.data?.product);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container single-product mt-4">
        <div className="row mb-3">
          <div className="col-md-8 product-img">
            <img
              src={`/product-image/${product.product_id}`}
              className="card-img-top"
              // height="300"
              // width={"350px"}
              alt={product.product_name}
            />
          </div>
          <div className="col-md-4 product-detail">
            <h2 className="text-center">Product Details</h2>
            <h4>Name: {product.product_name}</h4>
            <h5>Description: {product.product_description}</h5>
            <h1>Price: {product.product_price}</h1>
            <h4>Quantity: {product.product_quantity}</h4>
            <h4>Category: {product.category_name}</h4>

            <div>
              <button
                className="my-btn"
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cartItems",
                    JSON.stringify([...cart, product])
                  );
                  toast.success(
                    `${product.product_name} product added to cart`
                  );
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
