const express = require('express');
const Users = require('../models/Users');
const Auth = require('../middlewares/auth');
const Carts = require('../models/Carts');
const Products = require('../models/Products');
const router = express.Router();

router.get('/', Auth, async (req, res) => {
  try {
    const loggedInUser = await Users.findOne({ email: req.user.email });

    if (!loggedInUser) {
      return res.status(404).send("User not found");
    }

    const userCarts = await Carts.find({ userId: loggedInUser._id }).populate('products.productId');

    if (!userCarts) {
      return res.status(404).send("No carts found for this user");
    }
    return res.status(200).json({ userCarts });
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

router.post('/', Auth, async (req, res) => {
  try {
    const { id } = req.body;
    const loggedInUser = await Users.findOne({ email: req.user.email });
    const singleProduct = await Products.findOne({ _id: id });

    if (!loggedInUser) {
      return res.status(404).send("User not found");
    }

    if (!singleProduct) {
      return res.status(404).send("Product not found");
    }

    let cart = await Carts.findOne({ userId: loggedInUser._id, "products.productId": id });

    if (cart) {
      // Product exists in the cart, update quantity
      const productIndex = cart.products.findIndex(p => p.productId.toString() === id);

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
        await cart.save();
        return res.status(200).json("Updated product quantity in cart");
      }
    } else {
      // Product does not exist in any cart, create a new cart item
      const newProduct = { productId: id, quantity: 1 };
      cart = new Carts({
        userId: loggedInUser._id,
        products: [newProduct]
      });

      await cart.save();
      loggedInUser.carts.push(cart._id);
      await loggedInUser.save();

      return res.status(200).json("Added new product to cart");
    }
  } catch (error) {
    return res.status(500).send("Server error");
  }
});


// delete all carts:
router.delete('/', Auth, async (req, res) => {
  const removeCart = await Carts.deleteMany({ userId: req.user._id })
  if (!removeCart) {
    return res.status(404).send("Cart not found")
  }
  // delete all the carts from the carts field of loggedInUser which is an array:
  const loggedInUser = await Users.findOne({ email: req.user.email })
  loggedInUser.carts = []
  await loggedInUser.save()
  const allcarts = await Carts.find({ userId: req.user._id }).populate('products.productId').populate("userId")
  return res.status(200).json({ allcarts })
})

// delete single cart on the basis of id:
router.delete('/:id', Auth, async (req, res) => {
  const { id } = req.params

  const loggedInUser = await Users.findOne({ email: req.user.email })
  if (!loggedInUser) {
    return res.status(404).send("User not found")
  }
  // find a cart on the basis of product id in which product is a field of an array:
  const removeCart = await Carts.findOneAndDelete({ _id: id, _id: id })
  if (!removeCart) {
    return res.status(404).send("Cart not found")
  }
  // remove the cart from the user schema of loggedInUser in which cart is a field of an array:
  loggedInUser.carts = loggedInUser.carts.filter(cart => cart != id)
  await loggedInUser.save()
  const allcarts = await Carts.find({ userId: req.user._id }).populate('products.productId').populate("userId")
  return res.status(200).json({ allcarts })
})

module.exports = router;