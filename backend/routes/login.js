const express = require('express');
const Users = require('../models/Users');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const onlyAdmin = {email, password}
        const token = jwt.sign({onlyAdmin}, process.env.JWT_SECRET, {expiresIn: "15d"})
        req.session.admin = token
        return res.json({ token: "Admin" });
    }

    let user = await Users.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "15d"})
    req.session.encoded = token
    return res.json({ token: "Guest" });
})

module.exports = router;