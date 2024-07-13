const express = require('express');
const Products = require('../models/Products');
const upload = require("../middlewares/multer");
const AdminAuth = require('../middlewares/adminAuth');
const router = express.Router();

router.post('/', AdminAuth, upload.single("image"), async (req, res) => {
    const { pname, description, price, category } = req.body

    if (!pname || !price || !description || !category) {
        return res.status(404).json({ msg: "Feilds Not Found" })
    }

    const allProducts = await Products.find()

    const newProduct = await Products.create({ pname, price, description, category, image: req.file.buffer, id: allProducts.length + 1 })
    if (!newProduct) {
        return res.status(400).json({ err: "Error Occured While Creating new Product" })
    }
    await newProduct.save()
    return res.status(200).json({ succes: "Product has been added to list" })
})

router.get('/', AdminAuth, async (req, res) => {
    const allProducts = await Products.find()
    if (!allProducts) {
        return res.status(404).json({ err: "products not found" })
    }
    return res.status(200).json({ allProducts })
})

router.get('/:id', AdminAuth, async (req, res) => {
    const { id } = req.params
    const single_product = await Products.findOne({ id })
    if (!single_product) {
        return res.status(404).json({err: "Product doesn't exist"})
    }
    return res.status(200).json({single_product})
})

module.exports = router;