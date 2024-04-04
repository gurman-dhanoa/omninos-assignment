const express = require("express");
const { loginUser, registerUser, logout, getUserDetails } = require("../controllers/user.controller");
const { isAuthenticatedUser } = require("../middleware/auth");
const { getUserProducts } = require("../controllers/product.controller");
const Router = express.Router();

Router.route("/login").post(loginUser);
Router.route("/register").post(registerUser);
Router.route("/logout").put(logout);
Router.route("/").get(isAuthenticatedUser,getUserDetails);
Router.route("/products").get(isAuthenticatedUser,getUserProducts);

module.exports = Router;