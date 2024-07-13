const express = require('express');
const Auth = require('../middlewares/auth');
const Users = require('../models/Users');
const router = express.Router();

router.get('/', Auth, async (req, res) => {
    const user = await Users.findOne({email: req.user.email})
    if (!user) {
        return res.status(200).send("user not found")
    }
    return res.status(200).json({ user })
})

module.exports = router;