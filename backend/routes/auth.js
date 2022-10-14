const express = require("express");
const router = express.Router();
const { check } = require('express-validator');

const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post("/signup", [
    check("name").isLength({ min: 2 }).withMessage("Name has minimum 2 letters required"),
    check("email").isEmail().withMessage("valid Email should required"),
    check("password").isLength({ min: 6 }).withMessage("password must be of 6 characters minimum")
], signup);

router.post("/signin", [
    check("email").isEmail().withMessage("valid Email should required"),
    check("password").isLength({ min: 6 }).withMessage("wrong password")
], signin);

router.get("/signout", signout);

// test routes
router.get("/test", isSignedIn, (req, res) => {
    res.json(req.auth);
})

module.exports = router;