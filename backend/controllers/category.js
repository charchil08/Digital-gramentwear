const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cat) => {
        if (err) {
            return res.status(400).json({ error: "Category not found" });
        }
        req.category = cat;
        next();
    })
}

exports.createCategory = async (req, res) => {

    // check if category already exists
    const categoryExists = await Category.exists({ name: req.body.name });
    if (categoryExists) return res.status(400).json({ error: "category already exists" });

    const category = new Category(req.body);

    category.save((err, savedCat) => {
        if (err) {
            return res.status(400).json({ error: "Category not created" });
        }
        return res.status(200).json(savedCat);
    })
}

exports.getAllCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({ error: "Category not found" });
        }
        return res.status(200).json(categories);
    })
}

exports.getCategory = (req, res) => {
    try {
        return res.status(200).json(req.category);
    } catch (error) {
        return res.status(400).json({ error: "Category not found" });
    }
}

exports.updateCategory = (req, res) => {
    Category.findByIdAndUpdate(
        { _id: req.category._id },
        { $set: req.body },
        { new: true },
        (err, updatedCat) => {
            if (err) {
                return res.status(400).json({ error: "Category not updated" });
            }
            return res.status(200).json(updatedCat);
        }
    )
}

exports.removeCategory = (req, res) => {
    Category.findByIdAndRemove(
        { _id: req.category._id },
        (err, deletedCat) => {
            if (err) {
                return res.status(400).json({ error: "Category not removed" });
            }
            return res.status(200).json({ message: `${deletedCat.name} category removed` })
        }
    )
}