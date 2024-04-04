const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { addItemToCart, getCartItems, removeItemFromCart } = require("../controllers/cart.controller");
const Router = express.Router();

Router.route("/addItem").post(isAuthenticatedUser,addItemToCart);
Router.route("/deleteItem/:itemId").delete(isAuthenticatedUser,removeItemFromCart);
Router.route("/").get(isAuthenticatedUser,getCartItems);

module.exports = Router;