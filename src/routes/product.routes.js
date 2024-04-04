const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { createProduct, deleteProduct, updateProduct, getAllProducts, getProductDetails } = require("../controllers/product.controller");
const Router = express.Router();

Router.route("/").post(isAuthenticatedUser,createProduct);
Router.route("/:productId").delete(isAuthenticatedUser,deleteProduct).put(isAuthenticatedUser,updateProduct);
Router.route("/details/:productId").get(getProductDetails);
Router.route("/products").get(getAllProducts);

module.exports = Router;