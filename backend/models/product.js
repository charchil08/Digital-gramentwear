const mongoose = require("mongoose");
const category = require("./category");

const productSchema = mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        trim: true,
        required: true,
        default: "",
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    stock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0,
    },
    photo: {
        data: Buffer,
        contentType: String,
    }

}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema);