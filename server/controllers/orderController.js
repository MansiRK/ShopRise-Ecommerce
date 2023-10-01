/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
const db = require("../database");

const getOrdersByBuyer = (req, res) => {
  const buyer = req.user.user_id;
  // console.log(req.user.id);
  const fetchQuery =
    "SELECT o.*, p.* FROM orders AS o JOIN products AS p ON o.productId = p.product_id WHERE o.buyer = ? ORDER BY o.order_timestamps DESC";

  db.query(fetchQuery, [buyer], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: `Failed to fetch orders of this buyer. ${error.message}`,
      });
    }

    if (result.length === 0) {
      return res.status(400).json({
        message: "There are no orders of this buyer.",
      });
    }

    // Group orders with their respective products
    const ordersWithProducts = result.reduce((acc, row) => {
      if (!acc[row.order_id]) {
        // Initialize the order object if it doesn't exist
        acc[row.order_id] = {
          order_id: row.order_id,
          status: row.status,
          // Add other order properties here
          products: [], // Initialize an empty array for products
        };
      }

      // Add the product details to the products array of the corresponding order
      acc[row.order_id].products.push({
        product_id: row.product_id,
        product_name: row.product_name,
        product_description: row.product_description,
        product_price: row.product_price,
      });

      return acc;
    }, {});

    // Convert the object back to an array of orders
    const ordersArray = Object.values(ordersWithProducts);

    return res.status(200).json({
      message:
        "Fetched all orders of this buyer with product details successfully",
      orders: ordersArray,
    });
  });
};

const getAllOrders = (req, res) => {
  const fetchQuery = `
    SELECT u.user_id, u.name AS buyer_name, o.order_id, o.status, o.order_timestamps, p.product_id, p.product_name, p.product_description, p.product_price
    FROM users AS u
    JOIN orders AS o ON u.user_id = o.buyer
    JOIN products AS p ON o.productId = p.product_id
    ORDER BY u.user_id, o.order_id, p.product_id`;

  db.query(fetchQuery, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: `Failed to fetch orders with products. ${error.message}`,
      });
    }
    if (results.length === 0) {
      return res.status(400).json({
        message: "No orders found.",
      });
    }

    // Process the results to group orders by buyers
    const ordersByBuyer = {};
    results.forEach((row) => {
      const buyerId = row.user_id;
      const orderId = row.order_id;

      if (!ordersByBuyer[buyerId]) {
        ordersByBuyer[buyerId] = {
          buyer_name: row.buyer_name,
          orders: [],
        };
      }

      // eslint-disable-next-line function-paren-newline
      const order = ordersByBuyer[buyerId].orders.find(
        // eslint-disable-next-line implicit-arrow-linebreak, comma-dangle
        (o) => o.order_id === orderId
        // eslint-disable-next-line function-paren-newline
      );

      if (!order) {
        ordersByBuyer[buyerId].orders.push({
          order_id: orderId,
          status: row.status,
          order_timestamps: row.order_timestamps,
          products: [],
        });
      }

      ordersByBuyer[buyerId].orders.forEach((o) => {
        if (o.order_id === orderId) {
          o.products.push({
            product_id: row.product_id,
            product_name: row.product_name,
            product_description: row.product_description,
            product_price: row.product_price,
          });
        }
      });
    });

    return res.status(200).json({
      message: "All orders with products fetched successfully",
      allOrders: Object.values(ordersByBuyer),
    });
  });
};

const updateOrderStatus = (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const updateQuery = "UPDATE orders SET status = ? WHERE order_id = ? ";

  db.query(updateQuery, [status, orderId], (error, results) => {
    if (error) {
      return res.status(500).json({
        message: `Failed to update order status. ${error.message}`,
      });
    }
    if (results.affectedRows === 0) {
      return res.status(200).json({
        message: "No order found with this ID",
      });
    }

    const fetchQuery = "SELECT * FROM orders WHERE order_id = ?";

    db.query(fetchQuery, [orderId], (fetchError, fetchResults) => {
      if (fetchError) {
        return res.status(500).json({
          message: `Failed to fetch order status. ${error.message}`,
        });
      }
      return res.status(200).json({
        message: "Order status updated and fetched successfully",
        order: fetchResults,
      });
    });
  });
};

module.exports = {
  getOrdersByBuyer,
  getAllOrders,
  updateOrderStatus,
};
