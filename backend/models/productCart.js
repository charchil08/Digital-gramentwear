const mongoose = require("mongoose");

const productCartSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    name: String,
    count: {
        type: Number,
    },
    price: Number,

}, { timestamps: true })

module.exports = mongoose.model("ProductCart", productCartSchema);