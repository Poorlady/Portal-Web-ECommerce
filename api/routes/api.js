const express = require("express");

const routes = express.Router();

const productController = require("../controllers/products");

const userController = require("../controllers/users");

const storeController = require("../controllers/stores");

const orderController = require("../controllers/orders");

const adminController = require("../controllers/admins");

routes.post("/api/product/addreview", productController.postReview);
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
routes.get("/api/store/random", storeController.findRandom);
routes.get("/api/store/:params", storeController.findByName);
routes.post("/api/order", orderController.postOrder);
routes.get("/api/order/:params", orderController.getOrder);
routes.post("/api/user/cart", userController.addToCart);
routes.get("/api/user/cart/:id", userController.getCart);
routes.delete("/api/user/cart/:id", userController.deleteCart);
routes.post("/api/user/reset", userController.resetPassword);
routes.post("/api/user/changepassword", userController.changePassword);

routes.post("/api/stripe/post-intent", orderController.postIntent);

routes.post("/api/admin/category", adminController.addCategory);
routes.delete("/api/admin/category/:name", adminController.deleteCategory);
routes.get("/api/admin", adminController.getAdminData);
routes.post("/api/admin/carousel", adminController.postCarousel);
routes.delete("/api/admin/carousel/:name", adminController.deleteCarousel);
module.exports = routes;

// routes.get("/api/user/user", userController.getUser);

// routes.post("/api/product", productController.postProduct);
