const express = require('express');
const Users = require("../models/Users")
const router = express.Router();
const Products = require("../models/Products");
const Orders = require('../models/Orders');
const Auth = require('../middlewares/auth');
const AdminAuth = require('../middlewares/adminAuth');

router.post('/', Auth, async (req, res) => {
    const user = await Users.findOne({ email: req.user.email })
    const product = await Products.findOne({ id: req.body.id })
    if (!product) {
        return res.status(404).send("Product not found")
    }

    if (!user) {
        return res.status(404).send("User not found")
    }

    const order = await Orders.create({
        userId: user._id,
        productId: product._id,
        quantity: req.body.quantity
    })

    if (!order) {
        return res.status(404).send("Order not created")
    }
    try {
        user.orders.push(order._id)
        await user.save()

        return res.status(200).json("order")
    } catch (error) {
        return res.status(500).send("Server error")
    }


})

router.get('/admin', AdminAuth, async (req, res) => {
    try {
        const orders = await Orders.find().populate('productId').populate("userId")

        if (!orders) {
            return res.status(200).send("No Orders Available")
        }
        return res.status(200).json({ orders })

    } catch (err) {
        console.log(err.message)
    }

})

module.exports = router;