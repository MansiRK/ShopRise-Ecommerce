/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
const express = require("express");
const authController = require("../controllers/authController");
const authenticateUser = require("../middlewares/user");
const authenticateAdmin = require("../middlewares/admin");

const route = express.Router();

route.post("/register", authController.register);

route.post("/login", authController.login);

route.post("/logout", authController.logout);

route.get("/auth/user", authenticateUser, authController.authUser);

route.get(
  "/auth/admin",
  authenticateUser,
  authenticateAdmin,
  authController.authAdmin
);

module.exports = route;
