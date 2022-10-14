const formidable = require("formidable");
const fs = require("fs");
const Product = require("../models/product");
const ProductCart = require("../models/productCart");
const { getProductById } = require("./product");

exports.getCartProductById = (req, res, next, id) => {

    ProductCart.findById(id).exec((err, cartProduct) => {
        if (err) {
            res.status(400).json({ errror: err })
        }
        else {
            req.cartProduct = cartProduct;
            next();
        }
    })
}

exports.getAllCartProducts = (req, res) => {
    ProductCart.find({ user: req.profile._id })
        .populate("product", "-price -stock -sold -photo")
        .select("-user")
        .exec((err, cartProducts) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            return res.json(cartProducts);
        })
}


exports.addProductToCart = async (req, res) => {

    const cartProductExists = await ProductCart.exists({ name: req.body.name });
    if (cartProductExists) {
        ProductCart.findOneAndUpdate(
            { name: req.body.name },
            { $inc: { count: 1 } },
            null,
            (err, updatedCartProduct) => {
                if (err) {
                    return res.status(400).json({ error: err })
                }
                return res.json(updatedCartProduct)
            }
        )
    }
    else {
        const cartProduct = new ProductCart(req.body);
        cartProduct.save((err, savedCartProduct) => {
            if (err) {
                return res.status(400).json({ error: "Cart product not created" });
            }
            return res.status(200).json(savedCartProduct);
        })
    }
}

exports.removeProductFromCart = (req, res) => {
    ProductCart.findByIdAndRemove({ _id: req.cartProduct._id }, (err, deletedProductFromCart) => {
        if (err) {
            return res.status(400).json({
                error: `Can not delete ${req.cartProduct.name}`
            })
        }
        return res.status(200).json({
            message: `${deletedProductFromCart.name} deleted successfully`
        })
    })
}

exports.emptyCartProducts = (req, res) => {
    ProductCart.deleteMany({}, null, (err, doc) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        return res.json({ message: "Cart has been empty!" })
    })
}

exports.increaseCartProduct = (req, res) => {
    ProductCart.findOneAndUpdate({ _id: req.cartProduct._id }, { $inc: { count: 1 } }, null, (err, doc) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        return res.json({ message: "Incremented successfully" })
    })
}


exports.decreaseCartProduct = (req, res) => {
    ProductCart.findOneAndUpdate({ _id: req.cartProduct._id }, { $inc: { count: -1 } }, null, (err, doc) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        return res.json({ message: "Decremented successfully" })
    })
}