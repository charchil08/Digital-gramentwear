const express = require("express");
const router = express.Router();

const { createOrder, processPayment } = require("../controllers/paymentRazorpay");

router.post("/payment/create-order", createOrder)
router.post("/payment/process", processPayment)

module.exports = router;