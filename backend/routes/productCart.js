const express = require("express");
const router = express.Router();

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getPhoto } = require("../controllers/product");
const { addProductToCart, getCartProductById, removeProductFromCart, getAllCartProducts, emptyCartProducts, increaseCartProduct, decreaseCartProduct } = require("../controllers/productCart");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("cartProductId", getCartProductById);

router.get("/cart/:userId", isSignedIn, isAuthenticated, getAllCartProducts)
router.get("/cart/:userId/photo/:cartProductId", isSignedIn, isAuthenticated, getPhoto)
router.post("/cart/:userId/add-item", isSignedIn, isAuthenticated, addProductToCart);
router.delete("/cart/:userId/remove-item/:cartProductId", isSignedIn, isAuthenticated, removeProductFromCart)
router.delete("/cart/:userId/empty-cart", isSignedIn, isAuthenticated, emptyCartProducts)
router.put("/cart/:userId/inc-one/:cartProductId", isSignedIn, isAuthenticated, increaseCartProduct);
router.put("/cart/:userId/dec-one/:cartProductId", isSignedIn, isAuthenticated, decreaseCartProduct);

module.exports = router
