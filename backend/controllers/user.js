const User = require("../models/user");
const Order = require("../models/order");

// middleware

// @tag     get user id when params entered 
// @method  middleware
// @access  public
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "No user found" });
        }
        req.profile = user;
        next();
    })
}

// @tag     push new order into purchase list
// @method  middleware
// @access  public
exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.array.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            desc: product.desc,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id,
        })
    });

    // store data in mongodb
    User.findOneAndUpdate({ _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({ error: "Unable to update purchase list" });
            }
            console.log("line 41 : " + purchases);
            next();
        })
}


// @tag     get user details
// @method  GET     /user/:userId
// @access  protected
exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile["encry_password"] = undefined;
    req.profile.updatedAt = undefined;
    req.profile.__v = undefined;
    return res.status(200).json(req.profile);
}


// @tag     update user details
// @method  PUT     /user/:userId
// @access  protected
exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, updatedUser) => {
            if (err) {
                return res.status(400).json({ error: "No user found" });
            }
            updatedUser.salt = undefined
            updatedUser.encry_password = undefined
            return res.status(200).json(updatedUser);
        }
    )
}

// @tag     update user details
// @method  GET     /orders/user/:userId
// @access  protected
exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("User", "_id name email")
        .exec((err, purchaseList) => {
            if (err) {
                return res.status(400).json({ error: "No orders found" });
            }
            return res.status(200).json(purchaseList);
        })
}