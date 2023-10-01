/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
const express = require("express");

const productController = require("../controllers/productController");
const authenticateUser = require("../middlewares/user");
const authenticateAdmin = require("../middlewares/admin");

const route = express.Router();

route.post(
  "/product",
  authenticateUser,
  authenticateAdmin,
  productController.createProduct
);

route.get("/products", productController.getProducts);

route.get("/product/:slug", productController.getSingleProduct);

route.get("/product-category/:slug", productController.getProductsByCategory);

route.get("/product-image/:id", productController.getProductImage);

route.get("/product/search/:query", productController.searchProduct);

route.patch(
  "/product/:id",
  authenticateUser,
  authenticateAdmin,
  productController.updateProduct
);

route.delete(
  "/product/:id",
  authenticateUser,
  authenticateAdmin,
  productController.deleteProduct
);

module.exports = route;
