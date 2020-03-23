const express = require("express");

const routes = express.Router();

const productController = require("../controllers/products");

const userController = require("../controllers/users");

const storeController = require("../controllers/stores");

const orderController = require("../controllers/orders");

routes.post("/api/product", productController.postProduct);

routes.post("/api/edit-product/:id", productController.editProduct);

routes.get("/api/products", productController.getProducts);

routes.get("/api/products/:id", productController.getProductsById);

routes.get(
  "/api/products/filter/:params",
  productController.getProductByParams
);

routes.get(
  "/api/products/store/:params",
  productController.getProductsByStoreId
);

routes.delete("/api/products/:params", productController.deleteProducts);

routes.post("/api/user/signup", userController.signUp);

routes.post("/api/user/login", userController.logIn);

routes.put("/api/user/update/", userController.updateUser);

routes.post("/api/user/update-password/", userController.updatePassword);

routes.post("/api/user/getUserData", userController.getUser);

routes.post("/api/store/addStore", storeController.addStore);

routes.post("/api/store/getStore", storeController.getStore);

routes.post("/api/store/updateStore", storeController.updateStore);

routes.put("/api/store/addEtalase", storeController.addEtalase);

routes.get("/api/store/:params", storeController.findByName);

routes.post("/api/order", orderController.postOrder);
module.exports = routes;

routes.get("/api/order/:params", orderController.getOrder);

routes.post("/api/user/cart", userController.addToCart);
routes.get("/api/user/cart/:id", userController.getCart);
routes.delete("/api/user/cart/:id", userController.deleteCart);

// routes.get("/api/user/user", userController.getUser);

// routes.post("/api/product", productController.postProduct);
