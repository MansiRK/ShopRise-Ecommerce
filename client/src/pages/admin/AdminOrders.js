// import React, { useEffect, useState } from "react";
// import Layout from "../../components/Layout";
// import { useAuth } from "../../context/authContext";
// import axios from "axios";
// import moment from "moment";
// import { Select } from "antd";
// import AdminMenu from "./AdminMenu";
// const { Option } = Select;

// const AdminOrders = () => {
//   const [status, setStatus] = useState([
//     "Not Process",
//     "Shipped",
//     "Delivered",
//     "Cancel",
//   ]);

//   const [changeStatus, setChangeStatus] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [auth, setAuth] = useAuth();

//   const getAllOrders = async () => {
//     try {
//       const res = await axios.get(`/orders`);
//       // console.log(res.data.orders);
//       setOrders(res.data.allOrders);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.accessToken) {
//       getAllOrders();
//     }
//   }, [auth?.accessToken]);

//   const handleStatus = async (order_id, value) => {
//     try {
//       const res = await axios.patch(`/order-status/${order_id}`, {
//         status: value,
//       });
//       getAllOrders();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="container-fluid order">
//         <div div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>

//           <div className="col-md-9 order-details">
//             <h2 className="text-center">All orders</h2>
//             {orders?.map((ord, item) => {
//               //   console.log(ord);
//               //   console.log(ord.orders.length);
//               //   console.log(ord.orders.products);
//               return (
//                 <div className="order-table shadow" key={item}>
//                   <h5 className="text-center mt-4">
//                     Buyer Name: {ord.buyer_name} and Orders: {ord.orders.length}
//                   </h5>

//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th scope="col">Sr No.</th>
//                         <th scope="col">Status</th>
//                         <th scope="col">Date</th>
//                         <th scope="col">Payment</th>
//                         <th scope="col">Quantity</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {ord.orders.map((order, orderIndex) => (
//                         <tr key={orderIndex}>
//                           <td>{orderIndex + 1}</td>
//                           <td>
//                             <Select
//                               bordered={false}
//                               onChange={(value) =>
//                                 handleStatus(order.order_id, value)
//                               }
//                               defaultValue={order?.status}
//                             >
//                               {status.map((status, item) => (
//                                 <Option key={item} value={status}>
//                                   {status}
//                                 </Option>
//                               ))}
//                             </Select>
//                           </td>
//                           {/* <td>{order?.status}</td> */}
//                           {/* <td>{ord?.buyer_name}</td> */}
//                           <td>
//                             {moment(order?.order_timestamps).format(
//                               "MMMM D, YYYY h:mm A"
//                             )}
//                           </td>
//                           <td>{order?.status ? "Success" : "Failed"}</td>
//                           <td>{order.products?.length}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>

//                   {ord.orders.map((order, orderIndex) => (
//                     <div key={orderIndex}>
//                       {order.products?.map((prod) => (
//                         <div className="row product">
//                           <div className="col-md-8 prod-img">
//                             <img
//                               src={`/product-image/${prod.product_id}`}
//                               className="card-img-top"
//                               alt={prod.product_name}
//                             />
//                           </div>
//                           <div className="col-md-4 prod-dtls">
//                             <div className="card-body">
//                               <div className="card-name-price">
//                                 <h5 className="card-title">
//                                   {prod.product_name}
//                                 </h5>
//                               </div>

//                               <p className="card-text">
//                                 {prod.product_description.substring(0, 400)}...
//                               </p>
//                               <h5 className="card-title">
//                                 {prod.product_price.toLocaleString("en-IN", {
//                                   style: "currency",
//                                   currency: "INR",
//                                 })}
//                               </h5>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminOrders;

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import AdminMenu from "./AdminMenu";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);

  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getAllOrders = async () => {
    try {
      const res = await axios.get(`/orders`);
      setOrders(res.data.allOrders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.accessToken) {
      getAllOrders();
    }
  }, [auth?.accessToken]);

  const handleStatus = async (order_id, value) => {
    try {
      const res = await axios.patch(`/order-status/${order_id}`, {
        status: value,
      });
      getAllOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid order">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9 order-details">
            <h2 className="text-center">All orders</h2>
            {orders?.map((ord, item) => (
              <div className="order-table shadow" key={item}>
                <h5 className="text-center mt-4">
                  Buyer Name: {ord.buyer_name} and Orders: {ord.orders.length}
                </h5>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Sr No.</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Product</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ord.orders.map((order, orderIndex) => (
                      <React.Fragment key={orderIndex}>
                        <tr>
                          <td>{orderIndex + 1}</td>
                          <td>
                            <Select
                              bordered={false}
                              onChange={(value) =>
                                handleStatus(order.order_id, value)
                              }
                              defaultValue={order?.status}
                            >
                              {status.map((status, item) => (
                                <Option key={item} value={status}>
                                  {status}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td>
                            {moment(order?.order_timestamps).format(
                              "MMMM D, YYYY h:mm A"
                            )}
                          </td>
                          {/* Product Details */}

                          <td colSpan="0">
                            <div className="col-lg-6">
                              {order.products?.map((prod, prodIndex) => (
                                <div className="row" key={prodIndex}>
                                  {/* <div className="prod-img" > */}
                                  <div className="col-lg-4">
                                    <img
                                      src={`/product-image/${prod.product_id}`}
                                      className="card-img-top"
                                      alt={prod.product_name}
                                    />
                                  </div>

                                  <div className="col-lg-2">
                                    <div className="prod-dtls">
                                      <div className="card-body">
                                        <div className="card-name-price">
                                          <h5 className="card-title">
                                            {prod.product_name}
                                          </h5>
                                        </div>
                                        <p className="card-text">
                                          {prod.product_description.substring(
                                            0,
                                            400
                                          )}
                                          ...
                                        </p>
                                        <h5 className="card-title">
                                          {prod.product_price.toLocaleString(
                                            "en-IN",
                                            {
                                              style: "currency",
                                              currency: "INR",
                                            }
                                          )}
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* </div> */}
                          </td>
                          <td>{order?.status ? "Success" : "Failed"}</td>
                          <td>{order.products?.length}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
