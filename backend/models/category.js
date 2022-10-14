const mongoose = require("mongoose");
const Product = require("./product");

const categorySchema = mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }

}, { timestamps: true })



module.exports = mongoose.model("Category", categorySchema);