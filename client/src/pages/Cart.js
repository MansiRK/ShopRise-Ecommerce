import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const removeCartProduct = (product_id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((Item) => Item.product_id === product_id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cartItems", JSON.stringify(myCart));
    } catch (error) {
      console.error(error);
    }
  };

  const totalAmount = () => {
    try {
      let total = 0;
      cart?.map((Item) => {
        total = total + Item.product_price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getToken = async () => {
    try {
      const res = await axios.get(`/braintree/token`);

      setClientToken(res.data?.braintreeToken.clientToken);
      // console.log(res.data.braintreeToken.clientToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.accessToken]);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();

      const res = await axios.post(`braintree/payment`, {
        nonce,
        cart,
      });
      if (res.status === 200) {
        setLoading(false);
        localStorage.removeItem("cartItems");
        setCart([]);
        navigate("/user/orders");
        toast.success("Payment completed successfully");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-fluid cart">
        <div className="row">
          <div className="col-md-12 cart-detail">
            <div className="text-center">
              <h2>{`Hello ${auth?.accessToken && auth?.user?.name}`}</h2>
              <h4 className="text-center">
                {cart?.length > 0
                  ? `You have ${cart.length} ${
                      cart.length === 1 ? "item" : "items"
                    } in your cart ${
                      auth?.accessToken ? "" : "Please login to checkout"
                    } `
                  : "Your Cart is empty"}
              </h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 product">
            <h3 className="text-center">Cart Item</h3>
            <hr />
            {cart?.map((prod) => (
              <div className="row">
                <div className="col-md-8 prod-image">
                  <img
                    src={`/product-image/${prod.product_id}`}
                    className="card-img-top"
                    alt={prod.product_name}
                  />
                </div>
                <div className="col-md-4 prod-detail">
                  <div className="card-body">
                    <div className="card-name-price">
                      <h4 className="card-title">{prod.product_name}</h4>
                    </div>

                    <p className="card-text">
                      {prod.product_description.substring(0, 400)}...
                    </p>
                    <h3 className="card-title">
                      {prod.product_price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h3>

                    <button
                      className="my-btn"
                      onClick={() => removeCartProduct(prod.product_id)}
                    >
                      Remove Product
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 payment">
            <h3 className="text-center">Checkout | Payment</h3>
            <hr />
            <h4 className="text-center">Total: {totalAmount()}</h4>
            <h5>Current Address: {auth?.user?.address}</h5>

            {!auth?.accessToken ? (
              <button
                className="btn btn-outline-danger"
                onClick={() =>
                  navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Login to checkout
              </button>
            ) : !clientToken || !cart?.length ? (
              " "
            ) : (
              <div className="mt-3 payment-option">
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />

                <button
                  className="btn btn-outline-primary"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth.user?.address}
                >
                  {loading ? "Processing..." : "Make payment"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
