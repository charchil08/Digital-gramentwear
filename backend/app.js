const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { connectDb } = require("./config/db");
const cookieParser = require("cookie-parser");
const colors = require("colors")

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

const paymentRazorpayRoutes = require("./routes/paymentRazorpay");
const productCartRoutes = require("./routes/productCart");

const app = express();
connectDb();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", productCartRoutes);

app.use("/api", paymentRazorpayRoutes);

app.listen(port, (req, res) => {
    console.log(`Server started on ${port}`.bold.cyan);
})