const express = require('express');
const Auth = require('../middlewares/auth');
const Products = require('../models/Products');
const router = express.Router();

router.get('/', Auth, async (req, res) => {
    const foodModel = await Products.find()
    if (!foodModel) {
        return res.status(404).send("Foods not found")
    }
    return res.status(200).json({ foodModel })
})

module.exports = router;