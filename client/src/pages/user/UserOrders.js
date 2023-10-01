import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import moment from "moment";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const res = await axios.get(`/buyer-order`);
      console.log(res.data.orders);
      setOrders(res.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.accessToken) {
      getOrders();
    }
  }, [auth?.accessToken]);

  return (
    <Layout>
      <div className="container-fluid order">
        <h2 className="text-center">All orders</h2>

        <div className="row">
          <div className="col-md-6 order-img">
            <img
              src="../images/orders.jpg"
              className="card-img-top"
              alt="orders"
            />
          </div>
          <div className="col-md-6 order-details">
            {orders?.map((ord, item) => {
              console.log(ord);
              // console.log(ord.orders.length);
              return (
                <div className="order-table shadow ">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sr No.</th>
                        <th scope="col">Status</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{item + 1}</td>
                        <td>{ord?.status}</td>
                        <td>
                          {moment(ord?.order_timestamps).format(
                            "MMMM D, YYYY h:mm A"
                          )}
                        </td>
                        <td>{ord?.status ? "Success" : "Failed"}</td>
                        <td>{ord.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  {ord.products?.map((prod) => (
                    <div className="row product">
                      <div className="col-md-8 prod-img">
                        <img
                          src={`/product-image/${prod.product_id}`}
                          className="card-img-top"
                          alt={prod.product_name}
                        />
                      </div>
                      <div className="col-md-4 prod-dtls">
                        <div className="card-body">
                          <div className="card-name-price">
                            <h5 className="card-title">{prod.product_name}</h5>
                          </div>

                          <p className="card-text">
                            {prod.product_description.substring(0, 400)}...
                          </p>
                          <h5 className="card-title">
                            {prod.product_price.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserOrders;
