const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    fullname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: String,
    profilePic: Buffer,
    address: String,
    carts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Carts"
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Orders"
        }
    ]
})

module.exports = mongoose.model("Users", userSchema)