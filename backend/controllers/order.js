const Order = require("../models/order");
const ProductCart = require("../models/productCart");

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.prouct", "name price")
        .exec((err, order) => {
            if (err) {  
                return res.status(400).json("No order in db")
            }
            req.order = order;
            next();
        })
}

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, savedOrder) => {
        if (err) {
            return res.status(400).json("order not saved in db")
        }
        return res.status(200).json(savedOrder);
    })
}

exports.getAllOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name")
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json("no order in db")
            }
            return res.status(200).json(orders);
        })
}

exports.getOrderStatus = (req, res) => {
    return res.status(200).json(Order.schema.path("status").enumValues)
}

exports.updateOrderStatus = (req, res) => {
    Order.findByIdAndUpdate({ _id: req.body.orderId },
        { $Set: { status: req.body.status } },
        (err, updatedOrderStatus) => {
            if (err) {
                return res.status(400).json({ error: "order status does not updated" })
            }
            return res.status(200).json(updatedOrderStatus);
        }
    )
}