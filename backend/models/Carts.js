const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }]
    ,
    addedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Carts', cartSchema);
