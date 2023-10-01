/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
const express = require("express");
const orderController = require("../controllers/orderController");
const authenticateUser = require("../middlewares/user");
const authenticateAdmin = require("../middlewares/admin");

const route = express.Router();

route.get("/buyer-order", authenticateUser, orderController.getOrdersByBuyer);

route.get(
  "/orders",
  authenticateUser,
  authenticateAdmin,
  orderController.getAllOrders
);

route.patch(
  "/order-status/:id",
  authenticateUser,
  authenticateAdmin,
  orderController.updateOrderStatus
);

module.exports = route;
