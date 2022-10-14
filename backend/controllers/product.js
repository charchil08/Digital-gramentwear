const formidable = require("formidable");
const Product = require("../models/product");
const _ = require("lodash");

const fs = require("fs");


exports.getProductById = (req, res, next, id) => {
    Product.findById(id).populate("category").exec((err, product) => {
        if (err) {
            return res.status(400).json({ error: "Product not found" });
        }
        req.product = product;

        next();
    })
}

exports.getPhoto = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        res.send(req.product.photo.data)
    }
    next();
}

// Bulkwrite middleware
exports.updateStock = (req, res, next) => {
    const myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { stock: -prod.count, sold: +prod.count } }
            }
        }
    })
    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({ error: "Bulk write failed" })
        }
        next();
    })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: "Problem with image" });
        }

        // TODO:Restrictions on fields
        const { name, desc, price, category, stock } = fields;

        if (!name || !desc || !price || !category || !stock) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // create product
        let product = new Product(fields);

        // handle file
        if (file.photo) {
            // checking for size
            if (file.photo.size > 3 * 1024 * 1024) {
                return res.json({
                    error: "Max 3MB File size allowed"
                })
            }
            // checking for type
            const type = file.photo.mimetype.split("/")[1];
            if (!(type === "jpeg" || type === "jpg" || type === "png")) {
                return res.status(400).json({
                    error: "Only jpeg/jpg/png file allowed"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.filepath);
            product.photo.contentType = type;
        }

        // save to the database
        product.save((err, savedProduct) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            return res.status(200).json(savedProduct);
        })
    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.status(200).json(req.product);
}

exports.removeProduct = (req, res) => {
    Product.findByIdAndDelete({ _id: req.product._id },
        (err, deletedProduct) => {
            if (err) {
                return res.status(400).json({
                    error: `Can not delete ${req.product.name}`
                })
            }
            return res.status(200).json({
                message: `${deletedProduct.name} deleted successfully`
            })
        }
    )
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: "Problem with image" });
        }

        // fetch product and extend
        // we can do this using spread(...) operator also
        let product = req.product;
        product = _.extend(product, fields);

        // handle file
        if (file.photo) {
            // checking for size
            if (file.photo.size > 3 * 1024 * 1024) {
                return res.json({
                    error: "Max 3MB File size allowed"
                })
            }
            // checking for type
            const type = file.photo.mimetype.split("/")[1];
            if (!(type === "jpeg" || type === "jpg" || type === "png")) {
                return res.status(400).json({
                    error: "Only jpeg/jpg/png file allowed"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.filepath);
            product.photo.contentType = type;
        }

        product.save((err, savedProduct) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            return res.status(200).json(savedProduct);
        })
    })
};

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 12;
    let sortBy = req.query.sortBy ? req.query.sortBy : "category";
    Product.find()
        .populate("category", "name")
        .select("-photo")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: "Can not display products"
                })
            }
            return res.status(200).json(products);
        })
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({ error: "No category found" });
        }
        res.status(200).json(category);
    })
}