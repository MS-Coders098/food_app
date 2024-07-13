const express = require('express');
const Auth = require('../middlewares/auth');
const upload = require('../middlewares/multer');
const Users = require('../models/Users');
const router = express.Router();

router.put('/', Auth, upload.single("profilePic"), async (req, res) => {
    const { fullname, address } = req.body

    if (!fullname || !address) {
        return res.status(404).send("fields not found")
    }

    const user = await Users.findOneAndUpdate(
        { email: req.user.email },
        { fullname, address, profilePic: req.file.buffer }
    )

    if (!user) {
        return res.status(404).send("user not found")
    }

    return res.status(200).send("user updated successfully")
})

module.exports = router;