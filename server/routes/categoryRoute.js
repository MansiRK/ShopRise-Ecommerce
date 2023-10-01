/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
const express = require("express");
const categoryController = require("../controllers/categoryController");
const authenticateUser = require("../middlewares/user");
const authenticateAdmin = require("../middlewares/admin");

const route = express.Router();

route.post(
  "/category",
  authenticateUser,
  authenticateAdmin,
  categoryController.createCategory
);

route.get("/categories", categoryController.getCategories);

route.get("/category/:slug", categoryController.getSingleCategory);

route.patch(
  "/category/:id",
  authenticateUser,
  authenticateAdmin,
  categoryController.updateCategory
);

route.delete(
  "/category/:id",
  authenticateUser,
  authenticateAdmin,
  categoryController.deleteCategory
);

module.exports = route;
