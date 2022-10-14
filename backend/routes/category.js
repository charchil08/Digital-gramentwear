const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getCategoryById, createCategory, getAllCategories, getCategory, updateCategory, removeCategory } = require("../controllers/category");
const { getUserById } = require("../controllers/user");

// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post("/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory);

router.get("/categories/all", getAllCategories);
router.get("/category/:categoryId", getCategory);

router.put("/category/:categoryId/:userId", isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory);


router.delete("/category/:categoryId/:userId", isSignedIn,
    isAuthenticated,
    isAdmin,
    removeCategory);


module.exports = router;