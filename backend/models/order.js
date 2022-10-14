const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCart",
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    transaction_id: {},
    status: {
        type: String,
        default: "",
        enum: ["Delivered", "Cancelled", "Shipped", "Processing", "Received"]
    },
    address: {
        type: String,
    },
    updated: Date,
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema);