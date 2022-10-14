const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getProductById, createProduct, getProduct, getPhoto, removeProduct, updateProduct, getAllProducts, getAllUniqueCategories } = require("../controllers/product");

// params 
router.param("userId", getUserById);
router.param("productId", getProductById);

// routes
router.post("/product/create/:userId", [isSignedIn, isAuthenticated, isAdmin,
    check("name").isLength({ min: 2 }).withMessage("Minimum 2 alphabets of name required"),
    check("price").isNumeric().withMessage("Price always be numeric"),
], createProduct);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", getPhoto);

router.delete("/product/:productId/:userId", [isSignedIn, isAuthenticated, isAdmin], removeProduct);

router.put("/product/:productId/:userId", [isSignedIn, isAuthenticated, isAdmin], updateProduct);


// listing routes
router.get("/products/all", getAllProducts);

router.get("/product/categories", getAllUniqueCategories);

module.exports = router;