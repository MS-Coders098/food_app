const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  },
  quantity : {
    type: Number,
    default: 1
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports =  mongoose.model('Orders', orderSchema);