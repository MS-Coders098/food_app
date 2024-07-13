const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require('../models/Users');

router.post('/', async (req, res) => {
    const { username, fullname, email, password } = req.body
    if (!username || !email || !fullname || !password) {
        return res.status(404).send("fields not foung")
    }
    const isAvailable = await Users.findOne({ email })
    if (isAvailable) {
        return res.status(500).send("Email already exist")
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = await Users.create({ username, fullname, email, password: hashPassword })
    if (!newUser) {
        return res.status(400).send("registeration Error")
    }
    await newUser.save()
    return res.status(200).send("Registered Successfully")

})

module.exports = router;