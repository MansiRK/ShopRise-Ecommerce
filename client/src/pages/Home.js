import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/authContext";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const getAllProducts = async (limit) => {
    try {
      setLoading(true);
      const res = await axios.get(`products?limit=${limit}`);
      setLoading(false);
      setProducts(res.data.products);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const limit = 10;
    getAllProducts(limit);
  }, []);

  return (
    <Layout>
      <div className="container-fluid home">
        <div className="search-bar">
          <SearchBar />
        </div>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="4"
              aria-label="Slide 5"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="./images/clothes.jpg"
                className="d-block w-100"
                alt="clothes"
              />
              <div className="carousel-caption d-none d-md-block">
                <h4>Clothes</h4>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="./images/electronics.jpg"
                className="d-block w-100"
                alt="electronics"
              />
              <div className="carousel-caption d-none d-md-block">
                <h4>Electronics</h4>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="./images/makeup.jpg"
                className="d-block w-100"
                alt="makeup"
              />
              <div className="carousel-caption d-none d-md-block">
                <h4>Makeup</h4>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="./images/watches.jpg"
                className="d-block w-100"
                alt="watches"
              />
              <div className="carousel-caption d-none d-md-block">
                <h4>Accessories</h4>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="./images/jewelry.jpg"
                className="d-block w-100"
                alt="jewelry"
              />
              <div className="carousel-caption d-none d-md-block">
                <h4>Jewelries</h4>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="container-fluid ">
          <h2 className="text-center">Best Sellers</h2>
          <div className="products d-flex flex-wrap">
            {products?.map((prod) => (
              // console.log(prod.product_id);
              // console.log(process.env.REACT_APP_API)

              <div className="card" key={prod.product_id}>
                <img
                  src={`/product-image/${prod.product_id}`}
                  className="card-img-top"
                  alt={prod.product_name}
                />
                <div className="card-body">
                  <h3 className="card-title">{prod.product_name}</h3>
                  <p className="card-text">
                    {prod.product_description.substring(0, 30)}
                  </p>

                  <button
                    onClick={() => navigate(`/product/${prod.product_slug}`)}
                    className="my-btn"
                  >
                    More Details
                  </button>
                  <button
                    className="my-btn"
                    onClick={() => {
                      setCart([...cart, prod]);
                      localStorage.setItem(
                        "cartItems",
                        JSON.stringify([...cart, prod])
                      );
                      toast.success(
                        `${prod.product_name} product added to cart`
                      );
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2">
            <button className="btn btn-warning" onClick={() => {}}>
              {loading ? "Loading...." : "Loadmore"}
            </button>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
