const express = require("express");
const paymentController = require("../controllers/paymentController");
const authenticateUser = require("../middlewares/user");

const route = express.Router();

route.get("/braintree/token", paymentController.braintreeToken);

route.post("/braintree/payment", authenticateUser, paymentController.payment);

module.exports = route;
